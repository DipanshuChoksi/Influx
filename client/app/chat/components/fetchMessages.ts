import { User } from '@/app/types';
import { getRequest } from '@/app/utils/api';

export const fetchMessages = async ({ userId, receiverId }: { userId: string; receiverId: string }) => {
  const response = await getRequest(`messages?senderId=${userId}&receiverId=${receiverId}`);

  if (response?.data?.success) {
    const history = response.data.messages.map((msg: any) => ({
      user: msg.sender === userId ? 'You' : 'Alice',
      time: new Date(msg.createdAt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      content: msg.message,
    }));
    return history;
  }
  return [];
};
