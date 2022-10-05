import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Gerador ioasys10</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
