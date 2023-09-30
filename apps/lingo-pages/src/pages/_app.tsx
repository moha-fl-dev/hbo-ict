import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import '../styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient();

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
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
