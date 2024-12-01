import { login } from "./login.js";

export function loginHandler() {
  const form = document.querySelector("#loginForm");
  if (form) {
    form.addEventListener("submit", submitForm);
  }
}

async function submitForm(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  try {
    const response = await login(data);

    const token = localStorage.getItem("LoginToken");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      document.querySelector("#message").innerHTML = `<div id="success">
      Welcome back!</div>`;

      window.location.href = "/account/profile.html";
    } else {
      document.querySelector(
        "#message"
      ).innerHTML = `<div id="error">Failed to retrieve login data.</div>`;
    }
  } catch (error) {
    document.querySelector(
      "#message"
    ).innerHTML = `<div id="error">${error.message}</div>`;
  }
}
