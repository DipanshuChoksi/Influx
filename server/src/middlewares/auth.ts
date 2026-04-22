import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '@/utils/auth';
import { ApiError } from '@/shared';
import { HttpStatusCode } from '@/types';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      throw new ApiError('Unauthorized: No token provided', 'authMiddleware', HttpStatusCode.UNAUTHORIZED);
    }
    const decoded = verifyToken(token);
    (req as any).user = decoded;

    next();
  } catch (error: any) {
    if (error.name === 'JsonWebTokenError') {
      next(new ApiError('Unauthorized: Invalid token', 'authMiddleware', HttpStatusCode.UNAUTHORIZED));
    } else if (error.name === 'TokenExpiredError') {
      next(new ApiError('Unauthorized: Token expired', 'authMiddleware', HttpStatusCode.UNAUTHORIZED));
    } else {
      next(error);
    }
    res.clearCookie('token');
    res.status(HttpStatusCode.UNAUTHORIZED).json({
      errors: {
        email: [error.message],
      },
    });
  }
};
