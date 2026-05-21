'use client';

import { useRouter } from 'next/navigation';
import AuthPageClient from './components/ui/AuthPageClient';
import useAuthStore from './features/auth/stores/auth.store';
import { useEffect } from 'react';

function AuthPage() {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard/home');
    }
  }, [user, router]);

  return <AuthPageClient />;
}

export default AuthPage;
