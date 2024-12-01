// formHandler.js

import { register } from "./register.js";
import { login } from "./login.js";
import { createPost } from "./createPost.js";

export function formHandler() {
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      handleFormSubmission(form);
    });
  });
}

async function handleFormSubmission(form) {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData); // Convert FormData to plain object

  const formId = form.id; // Get form ID to identify the form type

  // Handle based on the form's ID
  try {
    if (formId === "registerForm") {
      await register(data); // Call the register function for registration form
      showMessage(
        "Successfully registered! <br><a href='./login.html'>Log In here!</a>",
        "success"
      );
    } else if (formId === "loginForm") {
      await login(data); // Call the login function for login form
      const token = localStorage.getItem("LoginToken");
      const user = JSON.parse(localStorage.getItem("user"));

      if (token && user) {
        showMessage(`Welcome back, ${user.name}`, "success");
        window.location.href = "/index.html"; // Redirect to the home page after login
      } else {
        showMessage(
          "Failed to log in. Please check your credentials.",
          "error"
        );
      }
    } else if (formId === "createPostForm") {
      const postData = {
        title: data.title,
        body: data.body,
        media: {
          url: data.mediaUrl,
          alt: data.alt || "",
        },
      };
      await createPost(postData);
      showMessage("Post created successfully!", "success");
      form.reset(); // Reset form after submission
    } else {
      showMessage("Unknown form type", "error");
    }
  } catch (error) {
    showMessage(`Error: ${error.message}`, "error");
  }
}

function showMessage(message, type) {
  const messageContainer = document.querySelector("#message");
  if (messageContainer) {
    messageContainer.innerHTML = `<div id="${type}">${message}</div>`;
  }
}
