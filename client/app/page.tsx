'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthPageClient from '@/app/components/ui/AuthPageClient';
import { useFetchCurrentUser } from './hooks/useFetchCurrentUser';
import useUser from './contexts/user.context';

export default function Page() {
  const router = useRouter();

  const { loading } = useFetchCurrentUser();
  const user = useUser((state) => state.user);

  useEffect(() => {
    if (user) {
      router.replace('/home');
    }
  }, [user, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <AuthPageClient />;
}
