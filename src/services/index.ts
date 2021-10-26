import axios, { AxiosError } from 'axios'
import { parseCookies, setCookie } from 'nookies'
import { GetServerSidePropsContext } from 'next'

import { signOut } from 'context/AuthContext'
import { AuthTokenError } from './errors/AuthTokenError'

type Context = undefined | GetServerSidePropsContext

let isRefreshing = false
let failedRequestsQueue: {
  onSuccess: (token: string) => void
  onFailure: (err: AxiosError) => void
}[] = []

export const api = axios.create({
  baseURL: 'http://localhost:3000/api'
})

export function setupApiClient(ctx: Context = undefined) {
  let cookies = parseCookies(ctx)

  const apiAuth = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
      Authorization: `Bearer ${cookies['dashgo.token']}`
    }
  })

  apiAuth.interceptors.response.use(
    (response) => {
      return response
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        if (error.response.data?.code === 'token.expired') {
          // Renew the token
          cookies = parseCookies(ctx)
          const { 'dashgo.refreshToken': refreshToken } = cookies
          const originalConfig = error.config

          if (!isRefreshing) {
            isRefreshing = true

            apiAuth
              .post('/refresh', {
                refreshToken
              })
              .then((response) => {
                const { token } = response.data

                setCookie(ctx, 'dashgo.token', token, {
                  maxAge: 60 * 60 * 24 * 30, // 30 days
                  path: '/'
                })

                setCookie(
                  ctx,
                  'dashgo.refreshToken',
                  response.data.refreshToken,
                  {
                    maxAge: 60 * 60 * 24 * 30, // 30 days
                    path: '/'
                  }
                )

                apiAuth.defaults.headers['Authorization'] = `Bearer ${token}`

                failedRequestsQueue.forEach((request) =>
                  request.onSuccess(token)
                )
                failedRequestsQueue = []
              })
              .catch((err) => {
                failedRequestsQueue.forEach((request) => request.onFailure(err))
                failedRequestsQueue = []

                if (process.browser) {
                  signOut()
                }
              })
              .finally(() => {
                isRefreshing = false
              })
          }

          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              onSuccess: (token: string) => {
                originalConfig.headers['Authorization'] = `Bearer ${token}`
                resolve(apiAuth(originalConfig))
              },
              onFailure: (err: AxiosError) => {
                reject(err)
              }
            })
          })
        } else {
          if (process.browser) {
            signOut()
          } else {
            return Promise.reject(new AuthTokenError())
          }
        }
      }

      return Promise.reject(error)
    }
  )

  return apiAuth
}
