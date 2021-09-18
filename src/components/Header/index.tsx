import { Flex } from '@chakra-ui/react'

import { Logo } from './Logo'
import { Profile } from './Profile'
import { Notification } from './Notification'
import { SearchInput } from './SearchInput'
import { ContainerUi } from 'components/Ui'

export function Header() {
  return (
    <ContainerUi>
      <Logo />
      <SearchInput />

      <Flex align="center" ml="auto">
        <Notification />

        <Profile
          avatar="https://github.com/mauriciogirardi.png"
          name="Mauricio Girardi"
          email="maurigirarde@yahoo.com.br"
        />
      </Flex>
    </ContainerUi>
  )
}
