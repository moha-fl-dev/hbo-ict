import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import '../styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
const queryClient = new QueryClient();

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
        <main>{getLayout(<Component {...pageProps} />)}</main>
      </QueryClientProvider>
    </>
  );
}
