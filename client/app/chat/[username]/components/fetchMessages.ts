import { User } from '@/app/types';
import { getRequest } from '@/app/utils/api';

export const fetchMessages = async ({
  userId,
  receiverId,
  receiverName,
}: {
  userId: string;
  receiverId: string;
  receiverName: string;
}) => {
  const response = await getRequest(`messages?senderId=${userId}&receiverId=${receiverId}`);

  if (response?.data?.success) {
    const history = response.data.messages.map((msg: any) => ({
      user: msg.sender === userId ? 'You' : receiverName,
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
