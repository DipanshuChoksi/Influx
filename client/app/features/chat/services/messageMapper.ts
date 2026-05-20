import { Message } from '../types/chatTypes';

export function mapIncomingMessage(msg: Message, currentUserId: string | undefined, receiverName: string) {
  return {
    user: msg.sender === currentUserId ? 'You' : receiverName,
    time: new Date(msg.createdAt || Date.now()).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
    content: msg.message,
  };
}
