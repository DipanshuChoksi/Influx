import { User } from '@/app/types';
import { useEffect, useState } from 'react';
import { fetchAllUsers } from '../api/fetchAllUsers';

function useChatList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchAllUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return { users, loading };
}

export default useChatList;
