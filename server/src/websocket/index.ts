import { Server } from 'socket.io';
// import { socketAuthMiddleware } from './middlewares/auth';

import { registerChatHandlers } from './handlers/chat';

export const initializeSocket = (io: Server) => {
  // io.use((socket: Socket, next: any) => socketAuthMiddleware(socket, next));

  io.on('connection', (socket) => {
    registerChatHandlers(socket, io);

    socket.on('disconnect', () => {});
  });
};
