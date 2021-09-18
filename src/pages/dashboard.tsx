import { Flex } from '@chakra-ui/react'

import { Sidebar } from 'components/Sidebar'
import { Header } from 'components/Header'

export default function Dashboard() {
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" maxW={1480} mx="auto" my="6">
        <Sidebar />
      </Flex>
    </Flex>
  )
}
