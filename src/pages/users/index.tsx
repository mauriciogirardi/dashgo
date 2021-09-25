import { Box, Flex, Text, Button, Icon, Spinner } from '@chakra-ui/react'
import { RiAddLine } from 'react-icons/ri'
import { useState } from 'react'
import Link from 'next/link'

import { Pagination } from 'components/Pagination'
import { useUsers } from 'services/hooks/useUsers'
import { Sidebar } from 'components/Sidebar'
import { Header } from 'components/Header'
import { Table } from 'components/Table'

export default function UsersList() {
  const [page, setPage] = useState(1)

  const { data, isLoading, isFetching, error } = useUsers(page)

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p={['6', '8']}>
          <Flex mb="8" justify="space-between" align="center">
            <Text fontSize="2xl" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && (
                <Spinner ml="4" size="sm" color="gray.500" />
              )}
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

          {isLoading ? (
            <Flex justify="center">
              <Spinner color="pink.500" />
            </Flex>
          ) : error ? (
            <Flex>
              <Text>Falha ao obter dados dos usuários.</Text>
            </Flex>
          ) : (
            <>
              <Table data={data?.users} />
              <Pagination
                totalCountRegister={data?.totalCount ?? 0}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  )
}
