import { Stack } from '@chakra-ui/react'
import {
  RiContactsFill,
  RiDashboardLine,
  RiGitMergeFill,
  RiInputMethodFill
} from 'react-icons/ri'

import { NavSection } from './NavSection'
import { NavLink } from './NavLink'

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GERAL">
        <NavLink href="/dashboard" icon={RiDashboardLine} title="Dashboard" />
        <NavLink href="/users" icon={RiContactsFill} title="Usuários" />
      </NavSection>

      <NavSection title="AUTOMAÇÃO">
        <NavLink href="/forms" icon={RiInputMethodFill} title="Formulários" />
        <NavLink href="/automation" icon={RiGitMergeFill} title="Automação" />
      </NavSection>
    </Stack>
  )
}
