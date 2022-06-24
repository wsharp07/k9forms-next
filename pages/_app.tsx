import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navigation from "@components/Navigation";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navigation />
      <main role="main" className="container">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
