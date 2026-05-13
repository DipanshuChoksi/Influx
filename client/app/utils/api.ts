import axios from 'axios';
import { API_BASE_URL } from '../consts/global';

export const errorResponse = (message: string) => ({
  errors: {
    email: [message],
  },
});

export async function postRequest(endpoint: string, payload?: any) {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await axios.post(url, payload, {
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
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await axios.get(url, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    return null;
  }
}
export async function patchRequest(endpoint: string, payload?: any) {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await axios.patch(url, payload, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    return null;
  }
}
