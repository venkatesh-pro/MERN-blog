import '../styles/globals.css'
import { Provider } from '../context/index'
import { ToastProvider } from 'react-toast-notifications'
function MyApp({ Component, pageProps }) {
  return (
    <ToastProvider autoDismiss={true} autoDismissTimeout='2000'>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </ToastProvider>
  )
}

export default MyApp
