'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import FullPageLoader from '../../../components/ui/FullPageLoader';
import useAuthSession from '../hooks/useAuthSession';
import useUserStore from '../stores/auth.store';

function SessionProvider({ children }: { children: React.ReactNode }) {
  const { isInitialized } = useAuthSession();
  const user = useUserStore((state) => state.user);

  const router = useRouter();

  useEffect(() => {
    if (isInitialized && !user) {
      router.replace('/');
    }
  }, [isInitialized, user, router]);

  if (!isInitialized) {
    return <FullPageLoader />;
  }

  return children;
}

export default SessionProvider;
