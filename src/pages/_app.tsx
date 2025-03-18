import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '@/store';

import '@fontsource/poppins';
import '@/styles/globals.css'
import '@/styles/layout.css'
import '@/styles/skeleton.css'

import Navbar from '@/components/navigation/Navbar'
import Footer from '@/components/navigation/Footer';
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient()

type CustomAppProps = AppProps & {
  Component: AppProps["Component"] & { noLayout?: boolean}
}

export default function App({ Component, pageProps }: CustomAppProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <div className='flex flex-col min-h-screen'>
          <div className='flex-1'>
            {!Component.noLayout && <Navbar />}
            <QueryClientProvider client={queryClient}>
              <Component {...pageProps} />
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </div>
          {!Component.noLayout && <Footer />}
          <ToastContainer />
        </div>
      </PersistGate>
    </Provider>
  )
}
