import { getAllUsers, getUserById, updateUser } from '@/repositories';
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

export const GetAllUsersController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any)?.user?._id;
    const users = await getAllUsers(userId);

    res.status(HttpStatusCode.OK).json({
      message: 'Users fetched successfully',
      users,
    });
  } catch (error: any) {
    next(error);
  }
};

export const GetUserByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);

    if (!user) {
      throw new ApiError('User not found', 'getUserByIdController', HttpStatusCode.NOT_FOUND, true);
    }

    res.status(HttpStatusCode.OK).json({
      message: 'User fetched successfully',
      user,
    });
  } catch (error: any) {
    next(error);
  }
};

export const UpdateUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any)?.user?._id;
    const { name, email } = req.body;

    if (!userId) {
      throw new ApiError('Unauthorized', 'updateUserController', HttpStatusCode.UNAUTHORIZED, true);
    }

    const user = await updateUser(userId, { name, email });

    res.status(HttpStatusCode.OK).json({
      message: 'Profile updated successfully',
      user,
    });
  } catch (error: any) {
    next(error);
  }
};
