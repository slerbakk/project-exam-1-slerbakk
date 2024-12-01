import { createPost } from "../blog/createPost.js";

export function createPostHandler() {
  const form = document.querySelector("#createPostForm");

  if (form) {
    form.addEventListener("submit", submitForm);
  }
}

async function submitForm(event) {
  event.preventDefault();
  const form = event.target;
  const titleInput = form.querySelector('input[name="title"]');
  const bodyInput = form.querySelector('textarea[name="body"]');
  const mediaUrlInput = form.querySelector('input[name="mediaUrl"]');

  // Validate form fields
  if (!titleInput || !bodyInput || !mediaUrlInput) {
    document.getElementById("message").innerText = "Some form fields are missing.";
    return;
  }

  const title = titleInput.value;
  const body = bodyInput.value;
  const mediaUrl = mediaUrlInput.value;

  // Validate again to make sure they are not empty
  if (!title || !body || !mediaUrl) {
    document.getElementById("message").innerText = "Please fill in all fields.";
    return;
  }

  const postData = {
    title: title,
    body: body,
    media: {
      url: mediaUrl,
    },
  };

  try {
    const result = await createPost(postData); // API call
    document.getElementById("message").innerText = "Post created successfully!";
    form.reset();
  } catch (error) {
    document.getElementById("message").innerText = "Failed to create post. Please try again.";
  }
}