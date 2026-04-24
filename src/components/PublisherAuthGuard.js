'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getPublisherToken, getStoredPublisherUser, isPublisherUser } from '@/utils/auth';

export default function PublisherAuthGuard({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const token = getPublisherToken();
  const user = getStoredPublisherUser();
  const isAuthorized = Boolean(token && isPublisherUser(user) && user.is_approved);

  useEffect(() => {
    if (!token || !user) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
      return;
    }

    if (!isPublisherUser(user)) {
      router.replace('/login');
      return;
    }

    if (!user.is_approved) {
      router.replace('/login?reason=approval');
      return;
    }
  }, [isAuthorized, pathname, router, token, user]);

  if (!isAuthorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted">Checking your session...</p>
      </div>
    );
  }

  return children;
}
