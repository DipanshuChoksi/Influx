import { API_BASE_URL } from "../consts/global";
import { cookies } from "next/headers";

export const fetchCurrentUser = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token?.value) return null;

    const response = await fetch(`${API_BASE_URL}users/me`, {
      method: "GET",
      headers: {
        Cookie: `token=${token.value}`,
      },
      cache: "no-store",
    });

    if (!response.ok) return null;

    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

