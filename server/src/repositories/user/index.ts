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
export async function getAllUsers(userId?: string) {
  try {
    const query = userId ? { _id: { $ne: userId } } : {};
    const users = await UserModel.find(query).select('-password');
    return users;
  } catch (error) {
    throw error;
  }
}

export async function updateUser(id: string, updateData: any) {
  try {
    const user = await UserModel.findByIdAndUpdate(id, updateData, { new: true }).select('-password');
    return user;
  } catch (error) {
    throw error;
  }
}
