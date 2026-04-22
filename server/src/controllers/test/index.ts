import { NextFunction, Request, Response } from 'express';

export const TestController = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: 'API is working',
  });
};
