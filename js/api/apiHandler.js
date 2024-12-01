import { loadingIndicator } from '../ui/loadingIndicator.js'; // Import loading indicator function

const baseUrl = "https://v2.api.noroff.dev";

export async function apiRequest(endpoint, method = "GET", body = null) {
  const url = `${baseUrl}${endpoint}`;

  // Show loading indicator before making the request
  loadingIndicator(true);

  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
      "X-Noroff-API-Key": "f045f85d-83a1-47c8-ba1d-cebc9b804804",
    },
    body: body ? JSON.stringify(body) : null,
  };

  try {
    const response = await fetch(url, options);

    // Hide loading indicator after response is received
    loadingIndicator(false);

    // Check for a successful response with no content (204 No Content)
    if (response.status === 204) {
      return null; // No content, return null for DELETE operations
    }

    // If the response is not OK, handle errors
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(
        errorResponse.errors?.[0]?.message || "API request failed"
      );
    }

    // Parse JSON response if there's content
    return await response.json();
  } catch (error) {
    // Hide loading indicator in case of error
    loadingIndicator(false);
    throw error; // Throw the error if anything goes wrong
  }
}
