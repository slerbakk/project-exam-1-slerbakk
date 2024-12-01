export function checkUserStatus() {
  const token = localStorage.getItem("LoginToken");
  const user = localStorage.getItem("user");

  if (token && user) {
    try {
      return true;
    } catch (error) {
      return false;
    }
  } else {
    return false;
  }
}
