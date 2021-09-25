import { useQuery } from 'react-query'
import { api } from 'services'

interface User {
  createdAt: string
  email: string
  id: string
  name: string
}

type GetUserResponse = {
  totalCount: number
  users: User[]
}

export async function getUsers(page: number): Promise<GetUserResponse> {
  const { data, headers } = await api.get('/users', {
    params: {
      page
    }
  })

  const totalCount = Number(headers['x-total-count'])

  const users = data.users.map((user: User) => ({
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }))

  return { users, totalCount }
}

export function useUsers(page: number) {
  return useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10
  })
}
