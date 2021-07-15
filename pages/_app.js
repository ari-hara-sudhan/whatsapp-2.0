import '../styles/globals.css'
import {Provider} from "next-auth/client"
function MyApp({ Component, pageProps }) {
  return(
    <Provider sessin={pageProps.sessin}>
    <Component {...pageProps} />
    </Provider> 

  )

 
}

export default MyApp
