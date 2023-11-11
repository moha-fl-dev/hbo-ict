import { Toaster } from '@hbo-ict/ui';
import {
  QueryClient,
  QueryClientProvider,
  useIsFetching,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import Router from 'next/router';
import type { ReactElement, ReactNode } from 'react';
import '../styles/globals.css';

/**
 * @see
 *
 */
export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  // eslint-disable-next-line no-unused-vars
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
          if (Router.pathname !== '/sign-up') {
            Router.replace('/sign-in');
          }
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
        <LoadingSpinner />
        <main>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          {<Toaster />}
          {getLayout(<Component {...pageProps} />)}
        </main>
      </QueryClientProvider>
    </>
  );
}

function LoadingSpinner() {
  const isFetching = useIsFetching();
  if (!isFetching) {
    return null;
  }
  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-white bg-opacity-50">
      <div
        className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
