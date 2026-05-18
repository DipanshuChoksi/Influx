import { getRequest, patchRequest } from '../utils/api';

export const fetchClientCurrentUser = async () => {
  try {
    const response = await getRequest('users/me');

    if (!response || response.status !== 200) return null;

    return response.data.user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
};
export const fetchAllUsers = async () => {
  try {
    const response = await getRequest('users');

    if (!response || response.status !== 200) return [];

    return response.data.users;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return [];
  }
};
export const fetchUserByName = async (name: string) => {
  try {
    const response = await getRequest(`users/${name}`);

    if (!response || response.status !== 200) return null;

    return response.data.user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
};

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
