import { getRequest } from '@/app/utils/api';
import { mapIncomingMessage } from '../services/messageMapper';

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
    const history = response.data.messages.map((msg: any) => mapIncomingMessage(msg, userId, receiverName));
    return history;
  }
  return [];
};
