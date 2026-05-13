import { getRequest } from '../utils/api';

export const fetchClientCurrentUser = async () => {
  try {
    const response = await getRequest('users/me');

    if (!response || response.status !== 200) return null;

    return response.data.user;
  } catch (error) {
    return null;
  }
};
export const fetchAllUsers = async () => {
  try {
    const response = await getRequest('users');

    if (!response || response.status !== 200) return [];

    return response.data.users;
  } catch (error) {
    return [];
  }
};
export const fetchUserByName = async (name: string) => {
  try {
    const response = await getRequest(`users/${name}`);

    if (!response || response.status !== 200) return null;

    return response.data.user;
  } catch (error) {
    return null;
  }
};
