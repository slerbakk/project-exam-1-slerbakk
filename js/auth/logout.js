export function logout() {
  const confirmLogout = confirm("Are you sure you want to log out?");

  if (confirmLogout) {
    // Remove LoginToken and user from localStorage
    localStorage.removeItem("LoginToken");
    localStorage.removeItem("user");
    window.location.href = "/account/login.html";
  }
}
