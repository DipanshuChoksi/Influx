import { getRequest } from '@/app/utils/api';
import { mapIncomingMessage } from '../services/messageMapper';
import { IMessage } from '../types/chatTypes';

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
    const history = response.data.messages.map((msg: IMessage) => mapIncomingMessage(msg, userId, receiverName));
    return history;
  }
  return [];
};
