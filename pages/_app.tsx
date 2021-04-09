import { AppProps } from 'next/app'
// import { Provider } from 'next-auth/client'
import { HeaderComponent } from '../components/Header'
import { UserContext } from '../lib/context'

import { useUserData } from '../lib/hooks'

// Needed for Tailwind
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const userData = useUserData()
  return (
    <UserContext.Provider value={userData}>
      <HeaderComponent />
      <Component {...pageProps} />
    </UserContext.Provider>
  )
}

export default MyApp
