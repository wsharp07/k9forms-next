import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Navigation from '@components/Navigation';
import { QueryClient, QueryClientProvider } from 'react-query';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {

 const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>K-9 Forms</title>
      </Head>
      <Navigation />
      <main role="main" className="container" style={{ maxWidth: "1140px" }}>
        <Component {...pageProps} />
      </main>
    </QueryClientProvider>
  );
}

export default MyApp;
