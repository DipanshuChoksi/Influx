import { User } from '@/app/types';
import { socket } from '@/app/utils/socket';

export const handleSendMsg = (message: string, user: User | null, receiver: User) => {
  if (!message.trim() || !user || !receiver) return;

  const roomId = [user._id, receiver._id].sort().join('-');
  socket.emit('sendMsg', {
    message,
    receiverId: receiver._id,
    senderId: user._id,
    roomId,
  });
};
