import { RiLockFill, RiMailFill } from 'react-icons/ri'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Flex, Button, Stack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useShowPassword } from 'hooks/useShowPassword'
import { useAuth } from 'context/AuthContext'
import { Input } from 'components/Form/Input'
import { withSSRGuest } from 'utils/withSSRGuest'

interface SignInData {
  email: string
  password: string
}

const signInFormSchema = yup.object().shape({
  email: yup
    .string()
    .required('E-mail é um campo obrigatório!')
    .email('Tipo de email é invalido!'),
  password: yup.string().required('Senha é um campo obrigatório!')
})

export default function SignIn() {
  const { showPassword } = useShowPassword()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<SignInData>({
    resolver: yupResolver(signInFormSchema)
  })

  const { signIn, loading } = useAuth()

  const handleSignIn: SubmitHandler<SignInData> = async ({
    email,
    password
  }) => {
    signIn({
      password,
      email
    })
  }

  return (
    <Flex w="100%" h="100vh" px="5" align="center" justify="center">
      <Flex
        onSubmit={handleSubmit(handleSignIn)}
        as="form"
        bg="gray.800"
        w="100%"
        maxW={360}
        p="8"
        borderRadius={8}
        flexDir="column"
      >
        <Stack spacing="4">
          <Input
            label="Email"
            type="email"
            isFilled={!!watch().email}
            icon={RiMailFill}
            error={errors.email}
            {...register('email')}
          />
          <Input
            label="Senha"
            isFilled={!!watch().password}
            type={showPassword ? 'text' : 'password'}
            isTypePassword
            icon={RiLockFill}
            error={errors.password}
            {...register('password')}
          />
        </Stack>

        <Button
          isLoading={isSubmitting || loading}
          type="submit"
          colorScheme="pink"
          size="lg"
          mt="6"
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})
