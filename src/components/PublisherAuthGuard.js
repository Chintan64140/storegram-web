'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  getPublisherToken,
  getStoredPublisherUser,
  isPublisherUser,
} from '@/utils/auth';

export default function PublisherAuthGuard({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const [isReady, setIsReady] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = getPublisherToken();
    const user = getStoredPublisherUser();

    const authorized =
      token && isPublisherUser(user) && user?.is_approved;

    if (!token || !user) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    } else if (!isPublisherUser(user)) {
      router.replace('/login');
    } else if (!user.is_approved) {
      router.replace('/login?reason=approval');
    }

    setIsAuthorized(!!authorized);
    setIsReady(true);
  }, [pathname, router]);

  // 🚨 Prevent hydration mismatch
  if (!isReady) {
    return null; // or skeleton loader
  }

  if (!isAuthorized) {
    return null; // redirect already triggered
  }

  return children;
}