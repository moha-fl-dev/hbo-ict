import { Inter } from 'next/font/google'
import './global.css';

export const metadata = {
  title: 'Welcome to lingo',
  description: 'Generated by create-nx-workspace',
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
