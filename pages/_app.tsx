import { AppProps } from 'next/app'
// import { Provider } from 'next-auth/client'
import { Footer } from '../components/Footer'
import { UserContext } from '../lib/context'

import { useUserData } from '../lib/hooks'
import { ToastContainer } from 'react-toastify'
import PlausibleProvider from 'next-plausible'
import Head from 'next/head'

// Needed for Tailwind
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import { HeaderComponent } from '../components/Header'

function MyApp({ Component, pageProps }: AppProps) {
  const userData = useUserData()
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <UserContext.Provider value={userData}>
        <HeaderComponent />
        <PlausibleProvider domain="pomegradient.com">
          <Component {...pageProps} />
        </PlausibleProvider>
        <ToastContainer />
        <Footer />
      </UserContext.Provider>
    </>
  )
}

export default MyApp
