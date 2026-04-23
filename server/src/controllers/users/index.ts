import { getUserById } from '@/repositories';
import { ApiError } from '@/shared';
import { HttpStatusCode } from '@/types';
import { NextFunction, Request, Response } from 'express';

export const GetUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await getUserById((req as any)?.user?._id);

    if (!user) {
      throw new ApiError('User not found', 'getUserController', HttpStatusCode.NOT_FOUND, true);
    }

    res.status(HttpStatusCode.OK).json({
      message: 'User fetched successfully',
      user,
    });
  } catch (error: any) {
    res.status(HttpStatusCode.UNAUTHORIZED).json({
      message: 'User not found',
      user: null,
    });
    next(error);
  }
};

export const VerifiedUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(HttpStatusCode.OK).json({
      message: 'User verified successfully',
    });
  } catch (error: any) {
    next(error);
  }
};
