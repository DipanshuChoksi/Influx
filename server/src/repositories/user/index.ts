import { UserModel } from '@/models';

export async function getUserById(id: string) {
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw error;
  }
}
