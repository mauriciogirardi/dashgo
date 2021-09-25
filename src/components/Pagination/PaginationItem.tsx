import { Button } from '@chakra-ui/react'

interface PaginationItemProps {
  isCurrent?: boolean
  number: number
}

export function PaginationItem({
  isCurrent = false,
  number
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        bg="pink.500"
        colorScheme="pink"
        disabled
      >
        {number}
      </Button>
    )
  }

  return (
    <Button size="sm" fontSize="xs" width="4" bg="gray.700" colorScheme="pink">
      {number}
    </Button>
  )
}
