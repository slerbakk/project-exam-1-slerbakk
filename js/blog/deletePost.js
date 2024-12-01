import { apiRequest } from "../api/apiHandler.js"; // Import the API handler

export async function deletePost(postId) {
  try {
    const result = await apiRequest(
      `/blog/posts/TravelBlog24/${postId}`,
      "DELETE"
    );

    // If the result is null (indicating successful deletion)
    if (result === null) {
      // Directly return true after successful deletion
      return true;
    } else {
      // Return false if something went wrong
      return false;
    }
  } catch (error) {
    return false;
  }
}
