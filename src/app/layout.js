export const metadata = {
  title: "StoreGram - Secure Cloud Storage & Publisher Monetization",
  description: "Upload, share, and monetize your files with StoreGram.",
};

import { Suspense } from "react";
import Script from "next/script";
import "./globals.css";
import ScrollHandler from "@/components/Scroll-controller";
import Loader from "@/components/Loader";

const themeInitializationScript = `
  (() => {
    try {
      const storedTheme = window.localStorage.getItem('storegram-theme');
      const theme =
        storedTheme === 'light' || storedTheme === 'dark'
          ? storedTheme
          : window.matchMedia('(prefers-color-scheme: light)').matches
            ? 'light'
            : 'dark';

      document.documentElement.dataset.theme = theme;
    } catch (error) {
      document.documentElement.dataset.theme = 'dark';
    }
  })();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Script id="storegram-theme-init" strategy="beforeInteractive">
          {themeInitializationScript}
        </Script>
        <Suspense fallback={<Loader />}>
          {/* <ScrollHandler /> */}

          {children}
        </Suspense>
      </body>
    </html>
  );
}
