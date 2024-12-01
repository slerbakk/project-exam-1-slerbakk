import { checkUserStatus } from "../auth/checkUserStatus.js";
import { logout } from "../auth/logout.js";
import { addActiveClass } from "./addActiveClass.js";
export function renderNavbar() {
  const navbar = document.querySelector(".navbar");

  if (checkUserStatus()) {
    const user = JSON.parse(localStorage.getItem("user"));
    const userName = user?.name || "User";

    let navbarContent = `
      <li><a href="/index.html">Home</a></li>
    `;

    if (userName === "TravelBlog24") {
      navbarContent += `
        <li><a href="/post/create.html">Create Post</a></li>
        <li><a href="/account/profile.html">${userName}</a></li>
        <li><a href="javascript:void(0);" id="logoutButton">Log out</a></li>
      `;
    } else {
      navbarContent += `
        <li><a href="/account/profile.html">${userName}</a></li>
        <li><a href="javascript:void(0);" id="logoutButton">Log out</a></li>
      `;
    }

    navbar.innerHTML = navbarContent;

    const logoutButton = document.querySelector("#logoutButton");
    if (logoutButton) {
      logoutButton.addEventListener("click", logout);
    }

    addActiveClass(navbar);
  } else {
    navbar.innerHTML = `
      <li><a href="/index.html">Home</a></li>
      <li><a href="/account/login.html">Log in</a></li>
      <li><a href="/account/register.html">Register</a></li>
    `;
    addActiveClass(navbar);
  }
}
