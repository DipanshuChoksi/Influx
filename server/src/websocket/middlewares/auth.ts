import { NextFunction } from 'express';
import { Socket } from 'socket.io';

export const socketAuthMiddleware = (socket: Socket, next: NextFunction) => {};
