import type { AppProps } from 'next/app'

import '@fontsource/poppins';
import '@/styles/globals.css'
import '@/styles/layout.css'
import '@/styles/skeleton.css'

import Navbar from '@/components/navigation/Navbar'
import Footer from '@/components/navigation/Footer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return <>
  <Navbar />
  <QueryClientProvider client={queryClient}>
    <Component {...pageProps} />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
  <Footer />
  </>
}
