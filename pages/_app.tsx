import { AppProps } from 'next/app'
// import { Provider } from 'next-auth/client'
import { HeaderComponent } from '../components/Header'
import Footer from '../components/Footer'
import { UserContext } from '../lib/context'

import { useUserData } from '../lib/hooks'
import { ToastContainer } from 'react-toastify'

// Needed for Tailwind
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }: AppProps) {
  const userData = useUserData()
  return (
    <UserContext.Provider value={userData}>
      <HeaderComponent />
      <Component {...pageProps} />
      <ToastContainer />
      <Footer />
    </UserContext.Provider>
  )
}

export default MyApp
