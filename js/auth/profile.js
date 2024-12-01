export function renderProfile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("LoginToken");

  // If the user isn't logged in, redirect to the login page
  if (!token || !user) {
    window.location.href = "/account/login.html";
    return;
  }

  // Render the user's profile data
  const profileContainer = document.querySelector("#profile-details");

  if (profileContainer) {
    profileContainer.innerHTML = `
      <div>
        <h2>Welcome, ${user.name}!</h2>
        <img src="${user.avatar?.url || "default-avatar.jpg"}" class ="avatar" alt="${
      user.avatar?.alt || "Avatar"
    }" />
        <p>Email: ${user.email}</p>
        <p>Username: ${user.name}</p>
      </div>
    `;

    // Create the Log Out button
    const logoutButton = document.createElement("button");
    logoutButton.classList.add("button-logout"); // Add your existing button class
    logoutButton.textContent = "Log Out";

    // Add event listener to the Log Out button
    logoutButton.addEventListener("click", function () {
      // Remove user data and token from localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("LoginToken");

      // Redirect to the login page
      window.location.href = "/account/login.html";
    });

    // Append the Log Out button to the profile container
    profileContainer.appendChild(logoutButton);
  }
}
