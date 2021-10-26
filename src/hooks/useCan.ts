import { useAuth } from 'context/AuthContext'
import { validateUserPermissions } from 'utils/validateUsrPermissions'

type UserCanParams = {
  permissions?: string[]
  roles?: string[]
}

export function useCan({ permissions = [], roles = [] }: UserCanParams) {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return false
  }

  const useHasValidPermissions = validateUserPermissions({
    user,
    permissions,
    roles
  })

  return useHasValidPermissions
}
