import { apiRequest } from "../api/apiHandler.js";

export async function login(credentials) {
  const endpoint = "/auth/login/";

  try {
    const response = await apiRequest(endpoint, "POST", credentials);
    console.log("Login response:", response);

    const token = response.data.accessToken;
    const user = {
      name: response.data.name,
      email: response.data.email,
      avatar: response.data.avatar,
    };

    if (token && user) {
      // Save token and user data (name, email, avatar) for the profile page in localStorage
      localStorage.setItem("LoginToken", token);
      localStorage.setItem("user", JSON.stringify(user));
    } else {
    }

    return response;
  } catch (error) {
    throw error;
  }
}
