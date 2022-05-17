import { useRef } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Layout from '../components/Layout';
import '../styles/globals.css';
import { BookingProvider } from '../utils/context/bookingContext';
import { UserProvider } from '../utils/context/userContext';
function MyApp({ Component, pageProps }) {
  const queryClientRef = useRef();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  return (
    <QueryClientProvider client={queryClientRef.current}>
      <UserProvider value={pageProps.user}>
        <BookingProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </BookingProvider>
      </UserProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
