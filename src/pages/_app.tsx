import { AppProps } from "next/app";
import Layout from "../components/Layout";
import "../styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout title="Home | Next.js + TypeScript Example">
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
