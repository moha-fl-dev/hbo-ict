import type {
  LinksFunction,
  MetaFunction,
  V2_MetaFunction,
} from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: 'Lingo v2',
      description: 'Welcome to Lingo v2 🎉',
      charSet: 'utf-8',
    },
  ];
};

import styles from './global.css';

export const links: LinksFunction = () => [
  { title: 'New Remix App', rel: 'stylesheet', href: styles },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
