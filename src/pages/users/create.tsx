import { RiLockLine, RiMailLine, RiUserLine } from 'react-icons/ri'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useMutation } from 'react-query'
import { useRouter } from 'next/router'
import {
  Box,
  Flex,
  Text,
  Divider,
  Button,
  VStack,
  HStack,
  SimpleGrid
} from '@chakra-ui/react'
import * as yup from 'yup'

import { withSSRAuth } from 'utils/withSSRAuth'
import { useShowPassword } from 'hooks/useShowPassword'
import { Sidebar } from 'components/Sidebar'
import { Header } from 'components/Header'
import { Input } from 'components/Form/Input'
import { api, setupApiClient } from 'services'
import { queryClient } from 'services/queryClient'

interface UserData {
  name: string
  email: string
  password: string
  password_confirmation: string
}

const createUserSchema = yup.object().shape({
  name: yup.string().required('Nome é um campo obrigatório!'),
  email: yup
    .string()
    .required('E-mail é um campo obrigatório!')
    .email('Formato de email invalido!'),
  password: yup
    .string()
    .required('Senha é um campo obrigatório!')
    .min(6, 'A senha deve conter no mínimo 6 caracteres!'),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais!')
})

export default function CreateUser() {
  const { back } = useRouter()
  const { showPassword } = useShowPassword()
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<UserData>({
    resolver: yupResolver(createUserSchema)
  })

  const createUser = useMutation(
    async (user: UserData) => {
      const response = await api.post('/users', {
        user: {
          ...user,
          created_at: new Date()
        }
      })

      return response.data.user
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users')
      }
    }
  )

  const handleCreateUser: SubmitHandler<UserData> = async (data) => {
    await createUser.mutateAsync(data)
    reset()
    back()
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          onSubmit={handleSubmit(handleCreateUser)}
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={['6', '8']}
        >
          <Flex justify="space-between" align="center">
            <Text fontSize="2xl" fontWeight="normal">
              Criar Usuário
            </Text>
          </Flex>

          <Divider my="5" borderColor="gray.700" />

          <VStack spacing="4">
            <SimpleGrid minChildWidth="240px" spacing="5" w="100%">
              <Input
                label="Nome"
                icon={RiUserLine}
                {...register('name')}
                isFilled={!!watch().name}
                error={errors.name}
              />
              <Input
                type="email"
                label="Email"
                icon={RiMailLine}
                isFilled={!!watch().email}
                {...register('email')}
                error={errors.email}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing="5" w="100%">
              <Input
                type={showPassword ? 'text' : 'password'}
                label="Senha"
                icon={RiLockLine}
                {...register('password')}
                isFilled={!!watch().password}
                error={errors.password}
              />
              <Input
                type={showPassword ? 'text' : 'password'}
                label="Confirnação da senha"
                icon={RiLockLine}
                isTypePassword
                {...register('password_confirmation')}
                isFilled={!!watch().password_confirmation}
                error={errors.password_confirmation}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Button colorScheme="whiteAlpha" onClick={back}>
                Cancelar
              </Button>
              <Button type="submit" isLoading={isSubmitting} colorScheme="pink">
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}

export const getServerSideProps = withSSRAuth(
  async (ctx) => {
    const apiClient = setupApiClient(ctx)
    const response = await apiClient.get('/me')

    return {
      props: {}
    }
  },
  {
    permissions: ['users.create'],
    roles: ['administrator']
  }
)
