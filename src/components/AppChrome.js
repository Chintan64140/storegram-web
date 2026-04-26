'use client';

import { usePathname } from 'next/navigation';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const PUBLIC_CHROME_ROUTES = new Set([
  '/',
  '/about',
  '/contact',
  '/dmca',
  '/privacy',
  '/terms',
]);

export default function AppChrome({ children }) {
  const pathname = usePathname();
  const usePublicChrome = PUBLIC_CHROME_ROUTES.has(pathname || '');

  if (!usePublicChrome) {
    return children;
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Navbar />
      <div className="flex flex-1 flex-col pt-10 sm:pt-0">{children}</div>
      <Footer />
    </div>
  );
}
