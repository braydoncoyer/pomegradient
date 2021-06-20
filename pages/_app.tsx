import { AppProps } from 'next/app'

import { ToastContainer } from 'react-toastify'
import PlausibleProvider from 'next-plausible'

// Needed for Tailwind
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <PlausibleProvider domain="pomegradient.com">
        <Component {...pageProps} />
      </PlausibleProvider>
      <ToastContainer />
    </>
  )
}

export default MyApp
