import { Application } from 'express';
import { createServer, Server as HttpServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

import { logger } from '@/shared';
import { initializeSocket } from '@/websocket';

interface SocketModuleReturn {
  server: HttpServer;
  io: SocketIOServer;
}

const socketModule = (app: Application, ORIGINS: string[] = []): SocketModuleReturn => {
  const server = createServer(app);

  const io = new SocketIOServer(server, {
    cors: {
      origin: ORIGINS,
      credentials: true,
    },
  });

  initializeSocket(io);

  logger.info('WebSocket module initialized');

  return {
    server,
    io,
  };
};

export default socketModule;
