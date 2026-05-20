import { getRequest } from '@/app/utils/api';

export const fetchUserById = async (id: string) => {
  try {
    const response = await getRequest(`users/${id}`);

    if (!response || response.status !== 200) return null;

    return response.data.user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
};
