import { useEffect, useState } from 'react';
import { socket } from '../realtime/chatSocket';
import { fetchMessages } from '../api/fetchMessages';
import { User } from '@/app/types';
import { mapIncomingMessage } from '../services/messageMapper';
import { CHAT_EVENTS } from '../realtime/chatEvents';
import { MessageIncoming } from '../types/chatTypes';

function useConversationPage(user: User | null, receiver: User) {
  const [messages, setMessages] = useState<MessageIncoming[]>([]);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    const roomId = [user?._id, receiver._id].sort().join('-');
    socket.emit(CHAT_EVENTS.JOIN_ROOM, roomId);

    if (user) {
      fetchMessages({ userId: user._id, receiverId: receiver._id, receiverName: receiver.name }).then((data) => {
        setMessages(data);
      });
    }

    const handleMessage = (msg: any) => {
      setMessages((prev) => [...prev, mapIncomingMessage(msg, user?._id, receiver.name)]);
    };

    socket.on('receivedMsg', handleMessage);

    return () => {
      socket.off('receivedMsg', handleMessage);
    };
  }, [user, receiver._id]);

  return messages;
}

export default useConversationPage;
