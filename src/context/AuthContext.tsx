import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect
} from 'react'
import Router from 'next/router'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { apiAuth } from 'services/apiClient'

interface SignInCredentials {
  email: string
  password: string
}

interface User {
  email: string
  permissions: string[]
  roles: string[]
}

interface AuthContextData {
  signIn(credentials: SignInCredentials): Promise<void>
  signOut(): void
  isAuthenticated: boolean
  user: User | undefined
  loading: boolean
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext({} as AuthContextData)

let authChannel: BroadcastChannel

export function signOut() {
  destroyCookie(undefined, 'dashgo.token')
  destroyCookie(undefined, 'dashgo.refreshToken')

  authChannel.postMessage('signOut')

  Router.push('/')
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()
  const [loading, setLoading] = useState(false)
  const isAuthenticated = !!user

  useEffect(() => {
    authChannel = new BroadcastChannel('auth')
    authChannel.onmessage = (message) => {
      switch (message.data) {
        case 'signOut':
          signOut()
          break
        default:
          break
      }
    }
  }, [])

  useEffect(() => {
    const { 'dashgo.token': token } = parseCookies()

    if (token) {
      apiAuth
        .get('/me')
        .then((response) => {
          const { email, roles, permissions } = response.data

          setUser({ email, roles, permissions })
        })
        .catch(() => {
          signOut()
        })
    }
  }, [])

  const signIn = async ({ password, email }: SignInCredentials) => {
    try {
      setLoading(true)
      const { data } = await apiAuth.post('/sessions', {
        email,
        password
      })

      const { permissions, roles, token, refreshToken } = data

      setCookie(undefined, 'dashgo.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })

      setCookie(undefined, 'dashgo.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })

      setUser({
        email,
        permissions,
        roles
      })

      apiAuth.defaults.headers['Authorization'] = `Bearer ${token}`

      Router.push('/dashboard')
      setLoading(false)
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, signIn, signOut, user, loading }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('must use AuthProvider')
  }

  return context
}
