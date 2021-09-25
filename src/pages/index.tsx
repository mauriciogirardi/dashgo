import { RiLockFill, RiMailFill } from 'react-icons/ri'
import { Flex, Button, Stack } from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Input } from 'components/Form/Input'
import { useShowPassword } from 'hooks/useShowPassword'

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

  const handleSignIn: SubmitHandler<SignInData> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log(data)
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
          isLoading={isSubmitting}
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
