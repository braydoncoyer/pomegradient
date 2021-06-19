import { AppProps } from 'next/app'
import { HeaderComponent } from '../components/Header'
import { Hero } from '../components/Hero'

import { ToastContainer } from 'react-toastify'
import PlausibleProvider from 'next-plausible'

// Needed for Tailwind
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <HeaderComponent /> */}
      <Hero />
      <PlausibleProvider domain="pomegradient.com">
        <Component {...pageProps} />
      </PlausibleProvider>
      <ToastContainer />
    </>
  )
}

export default MyApp
