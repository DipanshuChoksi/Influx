import { getRequest } from "../utils/api";

export const fetchClientCurrentUser = async () => {
  try {
    const response = await getRequest("users/me");

    if (!response || response.status !== 200) return null;

    return response.data.user;
  } catch (error) {
    return null;
  }
};
