import { UserModel } from '@/models';
import { ApiError } from '@/shared';
import { HttpStatusCode } from '@/types';
import { NextFunction, Request, Response } from 'express';
export const GetUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, _id } = (req as any).user;
    const user = await UserModel.findById(_id);

    if (!user) {
      throw new ApiError('User not found', 'getUserController', HttpStatusCode.NOT_FOUND, true);
    }

    res.status(HttpStatusCode.OK).json({
      message: 'User fetched successfully',
      data: { email, id: _id },
    });
  } catch (error: any) {
    next(error);
  }
};
