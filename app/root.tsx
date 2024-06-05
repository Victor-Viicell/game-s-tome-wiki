import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

import type { MetaFunction } from '@remix-run/node';

// Components
import Navbar from './components/navbar';
import Xresize from './components/xresize';
import Sidebar from './components/sidebar';
import Container from './components/container';

import type { LinksFunction } from '@remix-run/node';
import './tailwind.css';

export const meta: MetaFunction = () => {
  return [
    { title: "Game's Tome" },
  ];
};

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Victor+Mono&display=swap' },
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
      <body className="bg-gd-prop flex h-screen w-screen flex-col overflow-hidden pb-1 px-1">
        <Navbar />
        <div className="flex h-full w-full flex-row overflow-hidden">
          <Xresize>
            <Sidebar />
          </Xresize>
          <Container>{children}</Container>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
