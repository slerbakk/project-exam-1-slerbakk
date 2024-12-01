import { apiRequest } from "../api/apiHandler.js"; 
import { checkUserStatus } from "../auth/checkUserStatus.js";

// Fetch post details for editing
export async function fetchPostForEditing() {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  if (postId) {
    try {
      const post = await apiRequest(
        `/blog/posts/TravelBlog24/${postId}`,
        "GET"
      );
      const postContainer = document.querySelector("#post-container");

      // Ensure the container exists
      if (postContainer) {
        // Create elements for the form
        const fieldset = document.createElement("fieldset");
        const h1 = document.createElement("h1");
        h1.textContent = "Edit Post";

        const messageDiv = document.createElement("div");
        messageDiv.id = "message";

        const form = document.createElement("form");
        form.id = "editPostForm";

        // Title input field
        const titleInput = document.createElement("input");
        titleInput.type = "text";
        titleInput.name = "title";
        titleInput.placeholder = "Title";
        titleInput.value = post.data.title;
        titleInput.required = true;

        // Body input field
        const bodyInput = document.createElement("textarea");
        bodyInput.name = "body";
        bodyInput.placeholder = "Your story!";
        bodyInput.value = post.data.body;
        bodyInput.required = true;

        // Media URL label and input field
        const h2 = document.createElement("h2");
        const label = document.createElement("label");
        label.setAttribute("for", "mediaUrl");
        label.textContent = "Link to photo:";
        h2.appendChild(label);

        const mediaUrlInput = document.createElement("input");
        mediaUrlInput.type = "url";
        mediaUrlInput.name = "mediaUrl";
        mediaUrlInput.pattern =
          "https?://(?:www.)?.+.(?:jpg|jpeg|png|gif|webp)$";
        mediaUrlInput.placeholder = "Enter image URL";
        mediaUrlInput.value = post.data.media?.url || "";
        mediaUrlInput.required = true;

        // Submit button
        const submitButton = document.createElement("button");
        submitButton.type = "submit";
        submitButton.className = "button";
        submitButton.textContent = "Update Post";

        // Append elements to form
        form.appendChild(titleInput);
        form.appendChild(bodyInput);
        form.appendChild(h2);
        form.appendChild(mediaUrlInput);
        form.appendChild(submitButton);

        // Append form and message to fieldset
        fieldset.appendChild(h1);
        fieldset.appendChild(messageDiv);
        fieldset.appendChild(form);

        // Clear any existing content in the post container and append the new content
        postContainer.innerHTML = "";
        postContainer.appendChild(fieldset);

        // Handle form submission
        form.addEventListener("submit", async (event) => {
          event.preventDefault();

          // Ensure the form fields exist before accessing their values
          const title = titleInput.value;
          const body = bodyInput.value;
          const mediaUrl = mediaUrlInput.value;

          // Validate form fields again to make sure they are not empty
          if (!title || !body || !mediaUrl) {
            messageDiv.innerText = "All fields are required!";
            return;
          }

          // Basic URL validation for media URL
          const urlPattern = new RegExp(mediaUrlInput.pattern);
          if (!urlPattern.test(mediaUrl)) {
            messageDiv.innerText =
              "Please enter a valid image URL (jpg, jpeg, png, gif, webp).";
            return;
          }

          // Disable the submit button while the request is processing
          submitButton.disabled = true;
          submitButton.textContent = "Updating...";

          const updatedPost = {
            title: title,
            body: body,
            media: { url: mediaUrl }, // Collect data from form fields
          };

          await updatePost(postId, updatedPost, submitButton);
        });
      }
    } catch (error) {
      console.error("Error fetching post for editing:", error);
      messageDiv.innerText = "Failed to fetch the post. Please try again.";
    }
  }
}

// Function to update the post
async function updatePost(postId, updatedPost, submitButton) {
  try {
    const result = await apiRequest(
      `/blog/posts/TravelBlog24/${postId}`,
      "PUT",
      updatedPost
    );
    if (result) {
      alert("Post updated successfully!");
      window.location.href = `/post/index.html?id=${postId}`; // Redirect to the updated post details page
    } else {
      alert("Failed to update post.");
    }
  } catch (error) {
    console.error("Error updating post:", error);
    alert("There was an error updating the post. Please try again.");
  } finally {
    // Re-enable the submit button after the request is completed
    submitButton.disabled = false;
    submitButton.textContent = "Update Post";
  }
}

// Ensure the page has loaded before calling fetchPostForEditing
document.addEventListener("DOMContentLoaded", function () {
  fetchPostForEditing(); // Call the function to fetch and render the post details
});
