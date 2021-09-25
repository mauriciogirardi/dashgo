import { ReactNode } from 'react'

import { SidebarDrawerProvider } from './useSidebarDrawer'
import { ShowPasswordProvider } from './useShowPassword'

interface ProviderProps {
  children: ReactNode
}

export function Providers({ children }: ProviderProps) {
  return (
    <SidebarDrawerProvider>
      <ShowPasswordProvider>{children}</ShowPasswordProvider>
    </SidebarDrawerProvider>
  )
}
