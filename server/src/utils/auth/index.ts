import jwt from 'jsonwebtoken';
import { getEnvVariable } from '@/env';
import { Types } from 'mongoose';

export const generateToken = (user_id: Types.ObjectId): string => {
  const secret = getEnvVariable('JWT_SECRET');
  return jwt.sign({ _id: user_id }, secret, {
    expiresIn: '7d',
  });
};

export const verifyToken = (token: string): string | jwt.JwtPayload => {
  return jwt.verify(token, getEnvVariable('JWT_SECRET'));
};
