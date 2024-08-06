import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import "../styles/globals.css";
import "../styles/text-editor.css";
import { Suspense } from "react";
import { Providers } from "./Providers";

export const metadata = {
  title: "Collaborative Text Editor",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="/logo.png"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          href="/logo.png"
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
      </head>
      <body>
        <Providers>
          <Suspense>{children}</Suspense>
        </Providers>
      </body>
    </html>
  );
}
