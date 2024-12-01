import { apiRequest } from "../api/apiHandler.js";

export async function register(user) {
  const endpoint = "/auth/register/";

  try {
    const response = await apiRequest(endpoint, "POST", user);
    return response;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
}
