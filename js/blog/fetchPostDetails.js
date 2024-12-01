import { apiRequest } from "../api/apiHandler.js";
import { deletePost } from "./deletePost.js"; 
import { checkUserStatus } from "../auth/checkUserStatus.js";

export async function fetchPostDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  if (postId) {
    try {
      const post = await apiRequest(
        `/blog/posts/TravelBlog24/${postId}`,
        "GET"
      );

      const postContainer = document.querySelector("#post-details-container");

      if (postContainer) {
        // Render the post content
        postContainer.innerHTML = `
        
<section class="post-details">
    <h1>${post.data.title}</h1>
        <img src="${
          post.data.media?.url || "default-image-url.jpg"
        }" class="img-large" alt="${post.data.title}" />
          <div class="post-body">
    <p class="post-info">${post.data.body}</p>
  </div>
  <div class="post-meta">
    <p>Author: ${post.data.author?.name || "Unknown"}</p>
    <p>ID: ${post.data.id}</p>
    <p>Created: ${new Date(post.data.created).toLocaleDateString()}</p>
    
    <div class="post-details-buttons">
    </div>
  </div>

</section>
          
        `;

        // Check if the user is logged in before showing the buttons
        if (checkUserStatus()) {
          // Create Edit Button (Link)
          const editButton = document.createElement("a");
          editButton.href = `/post/edit.html?id=${post.data.id}`;
          editButton.classList.add("edit-button");
          editButton.textContent = "Edit Post";

          // Create Delete Button (Button Element)
          const deleteButton = document.createElement("button");
          deleteButton.id = "delete-button";
          deleteButton.classList.add("delete-button");
          deleteButton.textContent = "Delete Post";

          const postDetailsSection = postContainer.querySelector(
            ".post-details-buttons"
          );

          if (postDetailsSection) {
            // Append buttons to the section
            postDetailsSection.appendChild(editButton);
            postDetailsSection.appendChild(deleteButton);
          }

          // Handle the Delete button click event
          deleteButton.addEventListener("click", async () => {
            const confirmation = confirm(
              "Are you sure you want to delete this post?"
            );
            if (confirmation) {
              // Call the deletePost function to delete the post
              const result = await deletePost(postId);

              if (result) {
                alert("Post deleted successfully!");
                window.location.href = "/index.html";
              } else {
                alert("Failed to delete post.");
              }
            }
          });
        }
      }
    } catch (error) {
      console.log("Error fetching post details:", error);
    }
  } else {
    console.log("No post ID in URL");
  }
}
