import { patchRequest } from '../utils/api';

export const updateProfile = async (updateData: { name: string; email: string }) => {
  try {
    const response = await patchRequest('users/update', updateData);

    if (!response || response.status !== 200) return null;

    return response.data.user;
  } catch (error) {
    console.error('Failed to update user:', error);
    return null;
  }
};
