import {
  Input as InputChakra,
  InputProps as ChakraInputProps,
  FormLabel,
  FormControl
} from '@chakra-ui/react'

interface InputProps extends ChakraInputProps {
  label?: string
  name: string
}

export function Input({ name, label, ...rest }: InputProps) {
  return (
    <FormControl>
      {!!label && <FormLabel htmlFor="email">{label}</FormLabel>}

      <InputChakra
        name={name}
        id={name}
        focusBorderColor="pink.500"
        bgColor="gray.900"
        variant="filled"
        size="lg"
        _hover={{ bgColor: 'gray.900' }}
        {...rest}
      />
    </FormControl>
  )
}
