import { register } from "./register.js";

export function registerHandler() {
  const form = document.querySelector("#registerForm");
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
    await register(data);

    document.querySelector(
      "#message"
    ).innerHTML = `<div id="success">Successfully registered! <a href="./login.html">Log In here!</a></div>`;
  } catch (error) {
    document.querySelector(
      "#message"
    ).innerHTML = `<div id="error">${error.message}</div>`;
    console.log(error);
  }
}
