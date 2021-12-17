import '../styles/globals.css';
import { AuthProvider } from '@/components/globalState';
import { SellerAuthProvider } from '@/components/sellerGlobalState.jsx';
import Meta from '../components/Meta';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <SellerAuthProvider>
        <AuthProvider>
          <Meta />
          <Component {...pageProps} />
        </AuthProvider>
      </SellerAuthProvider>
    </>
  );
}

export default MyApp;
