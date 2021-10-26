import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult
} from 'next'
import decode from 'jwt-decode'
import { destroyCookie, parseCookies } from 'nookies'
import { AuthTokenError } from 'services/errors/AuthTokenError'
import { validateUserPermissions } from './validateUsrPermissions'

type WithSSRAuthOptions = {
  permissions?: string[]
  roles?: string[]
}

export function withSSRAuth<P>(
  fn: GetServerSideProps<P>,
  options?: WithSSRAuthOptions
): GetServerSideProps {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx)
    const token = cookies['dashgo.token']

    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }

    if (options) {
      const { permissions, roles } = options
      const user = decode<{ permissions: string[]; roles: string[] }>(token)
      const useHasValidPermissions = validateUserPermissions({
        user,
        permissions,
        roles
      })

      if (!useHasValidPermissions) {
        return {
          redirect: {
            destination: '/dashboard',
            permanent: false
          }
        }
      }
    }

    try {
      return await fn(ctx)
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(ctx, 'dashgo.token')
        destroyCookie(ctx, 'refreshToken.token')

        return {
          redirect: {
            destination: '/',
            permanent: false
          }
        }
      }

      throw new Error('Error Authentication.')
    }
  }
}
