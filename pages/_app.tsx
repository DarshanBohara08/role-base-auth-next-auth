import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import Layout from "../components/Layout";
import "../styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <Layout title="Home | Next.js + TypeScript Example">
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
