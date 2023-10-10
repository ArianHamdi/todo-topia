import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { SDKProvider } from '@tma.js/sdk-react';
import Loader from '@/components/Loader';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';
import { sdkInitOptions } from '@/lib/twa-sdk';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import RootLayout from '@/layouts/RootLayout';
import PageTransition from '@/components/PageTransition';
import { useNextCssRemovalPrevention } from '@madeinhaus/nextjs-page-transition';

export default function App({ Component, pageProps }: AppProps) {
  useNextCssRemovalPrevention();

  return (
    <QueryClientProvider client={queryClient}>
      <SDKProvider initOptions={sdkInitOptions}>
        <Loader>
          <RootLayout>
            <PageTransition>
              <Component {...pageProps} />
            </PageTransition>
          </RootLayout>
        </Loader>
      </SDKProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
