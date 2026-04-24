export const metadata = {
  title: 'StoreGram - Secure Cloud Storage & Publisher Monetization',
  description: 'Upload, share, and monetize your files with StoreGram.',
};

import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
