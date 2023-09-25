import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SDKProvider } from "@twa.js/sdk-react";
import Loader from "@/components/Loader";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SDKProvider>
      <Loader>
        <Component {...pageProps} />
      </Loader>
    </SDKProvider>
  );
}
