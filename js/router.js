import { apiRequest } from "./api/apiHandler.js";
import { registerHandler } from "./auth/registerHandler.js";
import { loginHandler } from "./auth/loginHandler.js";
import { createPost } from "./blog/createPost.js";
import { fetchPosts } from "./blog/fetchPosts.js";
import { fetchPostDetails } from "./blog/fetchPostDetails.js";
import { checkUserStatus } from "./auth/checkUserStatus.js";
import { renderNavbar } from "./ui/nav.js";
import { renderProfile } from "./auth/profile.js";
import { fetchPostForEditing } from "./blog/editPostDetails.js";
import { loadingIndicator } from "./ui/loadingIndicator.js";
import { renderFooter } from "./ui/renderFooter.js";

export function router() {
  renderNavbar();
  renderFooter();
  const pathname = window.location.pathname;

  // General check for logged-in status on all routes where login is required
  const isProtectedRoute =
    pathname === "/post/edit.html" ||
    pathname === "/post/create.html" ||
    pathname === "/account/profile.html";

  // If trying to access protected routes without being logged in, redirect to login page
  if (isProtectedRoute && !checkUserStatus()) {
    window.location.href = "/account/login.html";
    return;
  }

  // Route-specific logic
  if (pathname === "/index.html" || pathname === "/") {
    import("./ui/carouselle.js");
    fetchPosts();
  } else if (pathname === "/account/register.html") {
    registerHandler();
  } else if (pathname === "/account/login.html") {
    loginHandler();
  } else if (pathname === "/account/profile.html") {
    renderProfile();
    loginHandler();
  } else if (pathname === "/create.html") {
    createPost();
  } else if (
    pathname === "/post/index.html" &&
    window.location.search.includes("id=")
  ) {
    fetchPostDetails();
  } else if (pathname === "/post/edit.html") {
    fetchPostForEditing();
  }
}
