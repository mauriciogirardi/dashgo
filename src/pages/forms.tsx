import { Flex, Text } from '@chakra-ui/react'

import { Header } from 'components/Header'
import { Sidebar } from 'components/Sidebar'

export default function Forms() {
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" maxW={1480} mx="auto" my="6" px="4">
        <Sidebar />

        <Flex w="100%" h="100%" align="center" justify="center">
          <Text fontSize="3xl" color="pink.400">
            FORMS
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
