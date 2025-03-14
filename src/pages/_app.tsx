import type { AppProps } from 'next/app'

import '@/styles/globals.css'
import '@/styles/layout.css'
import '@fontsource/poppins';

import Navbar from '@/components/navigation/Navbar'

export default function App({ Component, pageProps }: AppProps) {
  return <>
  <Navbar />
  <Component {...pageProps} />
  </>
}
