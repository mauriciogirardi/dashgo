import { Flex, Text, Box, Avatar } from '@chakra-ui/react'

interface ProfileProps {
  name: string
  email: string
  avatar: string
}

export function Profile({ name, avatar, email }: ProfileProps) {
  return (
    <Flex align="center">
      <Box textAlign="right" mr="4">
        <Text>{name}</Text>
        <Text color="gray.300" fontSize="small">
          {email}
        </Text>
      </Box>
      <Avatar size="md" name={name} src={avatar} />
    </Flex>
  )
}
