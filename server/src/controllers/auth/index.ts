import { UserModel } from '@/models';
import { ApiError } from '@/shared';
import { HttpStatusCode } from '@/types';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { generateToken } from '@/utils/auth';

export const LoginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new ApiError('User not found', 'LoginController', HttpStatusCode.NOT_FOUND, true);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ApiError('Invalid password', 'LoginController', HttpStatusCode.UNAUTHORIZED, true);
    }
    const token = generateToken(user._id);
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.status(HttpStatusCode.OK).json({ message: 'User logged in successfully' });
  } catch (error: any) {
    console.log(error?.message);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
  }
};

export const SignupController = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const isUserExist = await UserModel.findOne({ email });
    if (isUserExist) {
      throw new ApiError('User already exists', 'SignupController', HttpStatusCode.FORBIDDEN, true);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await UserModel.create({ email, password: hashedPassword, name });
    res.status(HttpStatusCode.CREATED).json({ message: 'User created successfully' });
  } catch (error: any) {
    console.error(error.message);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
  }
};

export const LogoutController = async (req: Request, res: Response) => {
  try {
    res.clearCookie('token');
    res.status(HttpStatusCode.OK).json({ message: 'User logged out successfully' });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
  }
};
