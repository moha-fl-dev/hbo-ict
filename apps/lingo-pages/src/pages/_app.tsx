import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { NextPage } from 'next';
import type { ReactElement, ReactNode } from 'react';
import '../styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from 'next/router';
import { AxiosError } from 'axios';
import { Toaster } from '@hbo-ict/ui';

/**
 * @see
 *
 */
export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

/**
 * create a new query client for the app
 *
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        console.log({
          queryClientError: error,
        });
        const err = error as AxiosError;
        /**
         * if the error is a 404, don't retry
         * if the error is a 401, don't retry. token refresh failed
         */

        if (err.response?.status === 404 || err.response?.status === 401) {
          Router.replace('/sign-in');
          return false;
        }
        // retry 2 times, then fail
        return failureCount < 2;
      },
    },
  },
});

/**
 * font
 */
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

/**
 * @param pageProps
 * @param Component
 * @returns the page with the layout
 */
export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      {/**
       * global font
       */}
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <QueryClientProvider client={queryClient}>
        <main>
          {<Toaster />}
          {getLayout(<Component {...pageProps} />)}
        </main>
      </QueryClientProvider>
    </>
  );
}
