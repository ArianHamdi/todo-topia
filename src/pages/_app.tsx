import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { SDKProvider } from '@twa.js/sdk-react';
import Loader from '@/components/Loader';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';
import { sdkInitOptions } from '@/lib/twa-sdk';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SDKProvider initOptions={sdkInitOptions}>
        <Loader>
          <Component {...pageProps} />
        </Loader>
      </SDKProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
