import { Flex, SimpleGrid } from '@chakra-ui/react'

import { Sidebar } from 'components/Sidebar'
import { Header } from 'components/Header'
import { GraphicLine } from 'components/GraphicLine'

const series1 = [{ name: 'series1', data: [31, 18, 12, 456, 12, 10] }]
const series2 = [{ name: 'series2', data: [2, 23, 25, 125, 145, 201] }]

export default function Dashboard() {
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" maxW={1480} mx="auto" my="6" px="4">
        <Sidebar />

        <SimpleGrid flex="1" gap="4" align="flex-start" minChildWidth="320px">
          <GraphicLine title="Inscritos da semana" series={series1} />
          <GraphicLine title="Taxa de abertura" series={series2} />
        </SimpleGrid>
      </Flex>
    </Flex>
  )
}
