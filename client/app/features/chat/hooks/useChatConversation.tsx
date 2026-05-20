import { User } from '@/app/types';
import { useEffect, useState } from 'react';
import { fetchUserById } from '../api/fetchUserById';

interface IUseChatConversation {
  userId: string;
}

function useChatConversation({ userId }: IUseChatConversation) {
  const [receiver, setReceiver] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getReceiver = async () => {
      try {
        const data = await fetchUserById(userId);
        setReceiver(data);
      } catch (error) {
        console.error('Error fetching receiver:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      getReceiver();
    }
  }, [userId]);

  return { receiver, loading };
}

export default useChatConversation;
