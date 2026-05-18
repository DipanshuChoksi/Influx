import { createMessage } from '@/repositories/message';
import { Server, Socket } from 'socket.io';

export const handleJoinRoom = (socket: Socket, io: Server) => async (payload: any) => {
  try {
    const roomId = typeof payload === 'string' ? payload : payload?.roomId;
    if (roomId) {
      socket.join(roomId);
    } else {
      socket.join('12345');
    }
  } catch (error) {
    console.error('Error in handleJoinRoom:', error);
  }
};

export const handleSendMessage = (socket: Socket, io: Server) => async (payload: any) => {
  try {
    const newMessage = await createMessage(payload);
    const roomId = payload?.roomId || '12345';
    io.to(roomId).emit('receivedMsg', newMessage);
  } catch (error: any) {
    socket.emit('error', { message: 'Failed to send message', details: error.message });
  }
};

export const handleStartWatchParty = (socket: Socket, io: Server) => (payload: any) => {};

export const handleSendRoomMessage = (socket: Socket, io: Server) => (payload: any) => {
  try {
    const roomId = payload?.roomId;
    if (roomId) {
      socket.to(roomId).emit('receivedRoomMsg', payload);
    }
  } catch (error: any) {
    socket.emit('error', { message: 'Failed to send room message', details: error.message });
  }
};
