import { Server, Socket } from 'socket.io';

export const handleJoinRoom = (socket: Socket, io: Server) => (payload: any) => {
  console.log('payload: ', payload);
  socket.join('12345');
};

export const handleSendMessage = (socket: Socket, io: Server) => (payload: any) => {
  console.log('payload: ', payload);
  socket.to('12345').emit('receivedMsg', payload);
};

export const handleStartWatchParty = (socket: Socket, io: Server) => (payload: any) => {};
