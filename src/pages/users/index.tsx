import { RiAddLine, RiPencilLine } from 'react-icons/ri'
import {
  Box,
  Flex,
  Text,
  Button,
  Icon,
  Table,
  Thead,
  Tr,
  Td,
  Tbody,
  Th,
  Checkbox,
  useBreakpointValue
} from '@chakra-ui/react'
import Link from 'next/link'

import { Pagination } from 'components/Pagination'
import { Header } from 'components/Header'
import { Sidebar } from 'components/Sidebar'

export default function UsersList() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p={['6', '8']}>
          <Flex mb="8" justify="space-between" align="center">
            <Text fontSize="2xl" fontWeight="normal">
              Usuários
            </Text>

            <Link href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo
              </Button>
            </Link>
          </Flex>

          <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th px={['4', '4', '6']} color="gray.300" width="8">
                  <Checkbox colorScheme="pink" />
                </Th>
                <Th>Usuário</Th>
                {isWideVersion && <Th>Data de cadastro</Th>}
                <Th></Th>
              </Tr>
            </Thead>

            <Tbody>
              <Tr>
                <Td px={['4', '4', '6']}>
                  <Checkbox colorScheme="pink" />
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight="bold">Mauricio Girardi</Text>
                    <Text color="gray.300" fontSize="sm">
                      maurigirarde@yaho.com.br
                    </Text>
                  </Box>
                </Td>
                {isWideVersion && <Td>16 de Setembro, 2021</Td>}
                <Td textAlign="right">
                  <Button
                    as="a"
                    size="sm"
                    variant="ghost"
                    pr={isWideVersion ? '' : '0'}
                    colorScheme="telegram"
                    leftIcon={
                      <Icon
                        as={RiPencilLine}
                        fontSize={isWideVersion ? '16' : '25'}
                      />
                    }
                  >
                    {isWideVersion && 'Editar'}
                  </Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>

          <Pagination />
        </Box>
      </Flex>
    </Box>
  )
}
