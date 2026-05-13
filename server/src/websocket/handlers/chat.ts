import { Server, Socket } from 'socket.io';
import { handleJoinRoom, handleSendMessage, handleStartWatchParty } from '../services/chat.services';

export const registerChatHandlers = (socket: Socket, io: Server) => {
  socket.on('join', handleJoinRoom(socket, io));
  socket.on('sendMsg', handleSendMessage(socket, io));
  // socket.on('recMsg', handleSendMessage(socket, io));
  socket.on('start-watch-party', handleStartWatchParty(socket, io));
};
