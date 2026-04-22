import express, { type Application, json, urlencoded, NextFunction, Response, Request } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import { BaseError, ErrorHandler, logger } from '@/shared';
import { authRouter, UserRouter } from '../routes/index';
import { TestController } from '@/controllers';
import { authMiddleware } from '@/middlewares/auth';

const applicationModule = (ORIGINS: string[] = []): Application => {
  const app = express();

  app.use(
    cors({
      origin: ORIGINS,
      credentials: true,
    })
  );

  app.use(compression());
  app.use(json());
  app.use(cookieParser());

  app.use(urlencoded({ extended: true }));

  // Testing route
  app.get('/test', TestController);

  app.use('/api/auth', authRouter);

  app.use('/api/users', authMiddleware, UserRouter);

  // Error Handling
  app.use(errorMiddleware);
  const errorHandler = new ErrorHandler(logger);

  process.on('uncaughtException', async (error: Error) => {
    await errorHandler.handleError(error);
    if (!errorHandler.isTrustedError(error)) process.exit(1);
  });

  process.on('unhandledRejection', async (reason: Error) => {
    throw reason;
  });

  async function errorMiddleware(error: BaseError, req: Request, response: Response, next: NextFunction) {
    if (!errorHandler.isTrustedError(error)) {
      next(error);
      return;
    }

    await errorHandler.handleError(error);
  }

  return app;
};

export default applicationModule;
