import axios from "axios";
import { API_BASE_URL } from "../consts/global";

export const errorResponse = (message: string) => ({
  errors: {
    email: [message],
  },
});

export async function postRequest(endpoint: string, payload?: any) {
  try {
    const response = await axios.post(`${API_BASE_URL}${endpoint}`, payload, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    return null;
  }
}

export async function getRequest(endpoint: string) {
  try {
    const response = await axios.get(`${API_BASE_URL}${endpoint}`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    return null;
  }
}
