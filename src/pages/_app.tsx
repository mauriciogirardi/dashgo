import { AppProps } from 'next/app'
import Head from 'next/head'
import { ChakraProvider } from '@chakra-ui/react'

import { theme } from 'styles/theme'
import { Providers } from 'hooks'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>dashgo</title>
      </Head>
      <Providers>
        <Component {...pageProps} />
      </Providers>
    </ChakraProvider>
  )
}
