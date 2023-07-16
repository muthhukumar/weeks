import type { LinksFunction } from "@remix-run/cloudflare";
import { cssBundleHref } from "@remix-run/css-bundle";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  ScrollRestoration,
} from "@remix-run/react";

import globalStylesheet from "~/global.css";
import stylesheet from "~/tailwind.css";

export const links: LinksFunction = () => [
  ...(cssBundleHref
    ? [
        {
          rel: "stylesheet",
          href: cssBundleHref,
        },
      ]
    : [
        { rel: "stylesheet", href: stylesheet },
        { rel: "stylesheet", href: globalStylesheet },
      ]),
];

export default function App() {
  return (
    <html
      lang="en"
      className="m-0 p-0 bg-gradient-to-r from-cyan-500 to-blue-500"
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <script
          dangerouslySetInnerHTML={{
            __html: `if (window.location.pathname === '/hours-left') {
console.log("Timeout is started", new Date().toTimeString());
  setTimeout(() => {
console.log("Page reloaded", new Date().toTimeString());
    location.reload();
  }, 60 * 60 * 1000); // 1 hour in milliseconds
}`,
          }}
        ></script>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <LiveReload />
      </body>
    </html>
  );
}
