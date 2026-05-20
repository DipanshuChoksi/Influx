'use client';

import { useRouter } from 'next/navigation';
import AuthPageClient from './components/ui/AuthPageClient';
import useAuthStore from './features/auth/stores/auth.store';
import { useEffect } from 'react';

function AuthPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  console.log(user);

  useEffect(() => {
    if (user) {
      router.push('/dashboard/home');
    }
  }, []);

  return <AuthPageClient />;
}

export default AuthPage;
