import { checkUserStatus } from "../auth/checkUserStatus.js";
import { logout } from "../auth/logout.js";
import { addActiveClass } from "./addActiveClass.js";

export function renderFooter() {
  const footer = document.querySelector(".footer");

  // Check if the user is logged in
  if (checkUserStatus()) {
    const user = JSON.parse(localStorage.getItem("user"));
    const userName = user?.name || "User";

    let footerContent = `
        <div class="footer-links">
          <ul>
            <li><a href="/index.html">Home</a></li>
      `;

    if (userName === "TravelBlog24") {
      footerContent += `
          <li><a href="/post/create.html">Create Post</a></li>
          <li><a href="/account/profile.html">${userName}</a></li>
          <li><a href="javascript:void(0);" class="logoutButton">Log out</a></li>
        `;
    }

    footerContent += `
          </ul>
        </div>
      `;

    footer.innerHTML = footerContent;

    // Use event delegation: listen for clicks on the footer, and handle logout when target is .logoutButton
    footer.addEventListener("click", (event) => {
      if (event.target && event.target.classList.contains("logoutButton")) {
        logout();
      }
    });
  } else {
    footer.innerHTML = `
        <div class="footer-links">
          <ul>
            <li><a href="/index.html">Home</a></li>
            <li><a href="/account/login.html">Log In</a></li>
            <li><a href="/account/register.html">Register</a></li>
          </ul>
        </div>
      `;
  }

  // Call to add active class
  addActiveClass(footer);
}
