import { RiPencilLine } from 'react-icons/ri'
import {
  Box,
  Text,
  Button,
  Icon,
  Table as TableChakra,
  Thead,
  Tr,
  Td,
  Tbody,
  Th,
  Checkbox,
  useBreakpointValue
} from '@chakra-ui/react'
import { OverflowY } from './styles'

interface User {
  createdAt: string
  email: string
  id: string
  name: string
}

interface TableProps {
  data: User[] | undefined
}

export function Table({ data }: TableProps) {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  return (
    <OverflowY>
      <TableChakra colorScheme="whiteAlpha">
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

        {data?.map((item) => (
          <Tbody key={item.id}>
            <Tr>
              <Td px={['4', '4', '6']}>
                <Checkbox colorScheme="pink" />
              </Td>
              <Td>
                <Box>
                  <Text fontWeight="bold">{item.name}</Text>
                  <Text color="gray.300" fontSize="sm">
                    {item.email}
                  </Text>
                </Box>
              </Td>
              {isWideVersion && <Td>{item.createdAt}</Td>}
              <Td textAlign="right">
                <Button
                  as="a"
                  size="sm"
                  variant="ghost"
                  pr={isWideVersion ? '' : '0'}
                  colorScheme="telegram"
                  cursor="pointer"
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
        ))}
      </TableChakra>
    </OverflowY>
  )
}
