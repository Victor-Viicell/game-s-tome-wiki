import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

import type { MetaFunction } from '@remix-run/node';

import type { LinksFunction } from '@remix-run/node';
import './tailwind.css';

export const meta: MetaFunction = () => {
  return [{ title: "Game's Tome" }];
};

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Victor+Mono&display=swap',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex h-screen w-screen flex-col overflow-hidden bg-gd-prop px-1 pb-1">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
