import { getRequest } from '@/app/utils/api';

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
