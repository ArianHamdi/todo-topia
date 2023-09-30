import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { SDKProvider } from "@twa.js/sdk-react";
import Loader from "@/components/Loader";
import { InitOptions } from "@twa.js/sdk";

export default function App({ Component, pageProps }: AppProps) {
  const options: InitOptions = {
    cssVars: true,
  };

  return (
    <SDKProvider initOptions={options}>
      <Loader>
        <Component {...pageProps} />
      </Loader>
    </SDKProvider>
  );
}
