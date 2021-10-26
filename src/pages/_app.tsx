import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ChakraProvider } from '@chakra-ui/react'
import { makeServer } from 'services/mirage'
import { AppProps } from 'next/app'
import Head from 'next/head'

import { theme } from 'styles/theme'
import { Providers } from 'hooks'
import { queryClient } from 'services/queryClient'
import { AuthProvider } from 'context/AuthContext'

// if (process.env.NODE_ENV === 'development') {
//   makeServer()
// }

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Head>
          <title>dashgo</title>
        </Head>
        <AuthProvider>
          <Providers>
            <Component {...pageProps} />
          </Providers>
        </AuthProvider>
      </ChakraProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
