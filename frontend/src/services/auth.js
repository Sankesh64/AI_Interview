import { API_BASE_URL } from "../util/constant";

const API_URL = API_BASE_URL || "http://localhost:8000";

export async function getCurrentUser() {
  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      credentials: "include",
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error("Failed to fetch current user:", error);
    return null;
  }
}

export async function logoutUser() {
  try {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    console.error("Failed to logout:", error);
  }
}
