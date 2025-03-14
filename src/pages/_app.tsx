import type { AppProps } from 'next/app'

import '@/styles/globals.css'
import '@/styles/layout.css'
import '@fontsource/poppins';

import Navbar from '@/components/navigation/Navbar'
import Footer from '@/components/navigation/Footer';

export default function App({ Component, pageProps }: AppProps) {
  return <>
  <Navbar />
  <Component {...pageProps} />
  <Footer />
  </>
}
