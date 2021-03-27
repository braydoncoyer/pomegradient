import { AppProps } from 'next/app'
import { AuthProvider } from '../lib/auth'
// import { Provider } from 'next-auth/client'
import { HeaderComponent } from '../components/Header'

// Needed for Tailwind
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <Provider session={pageProps.session}>
    //   <HeaderComponent />
    //   <Component {...pageProps} />
    // </Provider>
    <AuthProvider>
      <HeaderComponent />
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
