import { ReactNode } from 'react'
import { Flex } from '@chakra-ui/react'

interface ContainerUiProps {
  children: ReactNode
}

export function ContainerUi({ children }: ContainerUiProps) {
  return (
    <Flex
      as="header"
      w="100%"
      maxW={1480}
      h="20"
      mx="auto"
      mt="4"
      px="4"
      align="center"
    >
      {children}
    </Flex>
  )
}
