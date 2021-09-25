import { RiEyeCloseFill, RiEyeFill } from 'react-icons/ri'
import { FieldError } from 'react-hook-form'
import { forwardRef, ForwardRefRenderFunction, ElementType } from 'react'
import {
  Input as InputChakra,
  InputProps as ChakraInputProps,
  FormLabel,
  FormControl,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Box,
  Button,
  Icon,
  FormErrorMessage
} from '@chakra-ui/react'

import { useShowPassword } from 'hooks/useShowPassword'

interface InputProps extends ChakraInputProps {
  label?: string
  icon?: ElementType
  isTypePassword?: boolean
  isFilled?: boolean
  error?: FieldError
  name: string
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  {
    name,
    label,
    icon,
    error = null,
    isTypePassword = false,
    isFilled = false,
    ...rest
  },
  ref
) => {
  const { handleClick, showPassword } = useShowPassword()

  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor="email">{label}</FormLabel>}

      <InputGroup>
        {!!icon && (
          <InputLeftElement>
            <Icon
              as={icon}
              fontSize="20"
              mt="2"
              color={isFilled ? 'pink.400' : 'gray.50'}
            />
          </InputLeftElement>
        )}

        <InputChakra
          autoComplete="off"
          name={name}
          id={name}
          focusBorderColor="pink.500"
          bgColor="gray.900"
          variant="filled"
          size="lg"
          _hover={{ bgColor: 'gray.900' }}
          ref={ref}
          {...rest}
        />

        {isTypePassword && (
          <InputRightElement mt="1">
            <Button
              size="sm"
              title="Mostrar Senha"
              variant="unstyled"
              onClick={handleClick}
              _focus={{}}
            >
              {showPassword ? (
                <Icon
                  as={RiEyeFill}
                  fontSize="20"
                  color="pink.400"
                  _hover={{ color: 'pink.500' }}
                />
              ) : (
                <Icon
                  as={RiEyeCloseFill}
                  fontSize="20"
                  color="pink.400"
                  _hover={{ color: 'pink.500' }}
                />
              )}
            </Button>
          </InputRightElement>
        )}
      </InputGroup>

      {!!error && (
        <Box mt="-1" mb="-2">
          <FormErrorMessage>{error.message}</FormErrorMessage>
        </Box>
      )}
    </FormControl>
  )
}

export const Input = forwardRef(InputBase)
