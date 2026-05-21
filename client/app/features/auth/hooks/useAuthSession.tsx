import { HttpStatusCode } from '@/app/consts/http';
import { getRequest } from '@/app/utils/api';
import { useEffect, useState } from 'react';
import useUserStore from '../stores/auth.store';
import { useRouter } from 'next/navigation';

function useAuthSession() {
  const { user, setUser } = useUserStore();
  const router = useRouter();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await getRequest('users/me');

        if (!response) {
          router.push('/');
          return;
        }

        if (response.status === HttpStatusCode.NOT_FOUND || response.status === HttpStatusCode.UNAUTHORIZED) {
          setIsInitialized(true);
          return;
        }

        setUser(response.data.user);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setIsInitialized(true);
      }
    }

    if (user) {
      setIsInitialized(true);
      return;
    }

    fetchUser();
  }, [user, setUser, router]);

  return { isInitialized };
}

export default useAuthSession;
