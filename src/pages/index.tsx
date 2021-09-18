import { Flex, Button, Stack } from '@chakra-ui/react'

import { Input } from 'components/Form/Input'

export default function SignIn() {
  return (
    <Flex w="100%" h="100vh" px="5" align="center" justify="center">
      <Flex
        as="form"
        bg="gray.800"
        w="100%"
        maxW={360}
        p="8"
        borderRadius={8}
        flexDir="column"
      >
        <Stack spacing="4">
          <Input name="email" label="Email" type="email" />
          <Input name="password" label="Senha" type="password" />
        </Stack>

        <Button type="submit" colorScheme="pink" size="lg" mt="6">
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}
