import { Provider } from 'next-auth/client'
import { HeaderComponent } from '../components/Header'

// Needed for Tailwind
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <HeaderComponent />
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
