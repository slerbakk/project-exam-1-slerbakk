import { apiRequest } from "../api/apiHandler.js";
import { checkUserStatus } from "../auth/checkUserStatus.js";

export async function createPost(post) {
  try {
    const result = await apiRequest(
      "/blog/posts/TravelBlog24/",
      "POST",
      post
    );
    return result;
  } catch (error) {
    if (error.response) {
    }
    throw error;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("createPostForm");

  // Ensure form is available before attaching the event listener
  if (form) {
    form.addEventListener("submit", async function (event) {
      event.preventDefault(); // Prevent the default form submission (page reload)

      const titleInput = form.querySelector('input[name="title"]');
      const bodyInput = form.querySelector('textarea[name="body"]');
      const mediaUrlInput = form.querySelector('input[name="mediaUrl"]');

      // Validate form fields
      if (!titleInput || !bodyInput || !mediaUrlInput) {
        document.getElementById("message").innerText =
          "Some form fields are missing.";
        return;
      }

      const title = titleInput.value;
      const body = bodyInput.value;
      const mediaUrl = mediaUrlInput.value;

      // Validate again to make sure they are not empty
      if (!title || !body || !mediaUrl) {
        document.getElementById("message").innerText =
          "Please fill in all fields.";
        return;
      }

      // Validate the URL pattern for mediaUrl
      const postData = {
        title: title,
        body: body, 
        media: {
          url: mediaUrl,
        },
      };

      try {
        const result = await createPost(postData);
        document.getElementById("message").innerText =
          "Post created successfully!";
        form.reset();
      } catch (error) {
        document.getElementById("message").innerText =
          "Failed to create post. Please try again.";
      }
    });
  }
});
