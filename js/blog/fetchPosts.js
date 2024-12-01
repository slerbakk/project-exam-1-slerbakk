import { apiRequest } from "../api/apiHandler.js";
import { createCarousel } from "../ui/carouselle.js";

export async function fetchPosts() {
  try {
    const posts = await apiRequest("/blog/posts/TravelBlog24", "GET");

    posts.data.sort((a, b) => new Date(b.created) - new Date(a.created));

    createPosts(posts.data);

    const latestPosts = posts.data.slice(0, 3);
    createCarousel(latestPosts);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

export function createPosts(posts) {
  const container = document.querySelector(".grid-container");

  container.innerHTML = "";

  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("grid-item");

    const postLink = document.createElement("a");
    postLink.href = `/post/index.html?id=${post.id}`;

    // Create and set up the title (h2) element with a maximum of 21 characters
    const title = document.createElement("h2");
    title.textContent =
      post.title.length > 21 ? post.title.slice(0, 21) + ".." : post.title; // Limit to 10 characters

    // Create and set up the image (img) element
    const image = document.createElement("img");
    image.src = post.media.url;
    image.classList.add("thumbnail");
    image.alt = post.title;

    // Create and set up the author and creation date paragraph (p)
    const author = document.createElement("p");
    author.textContent = `Author: ${post.author?.name || "Unknown"}`;

    const createdDate = document.createElement("p");
    createdDate.textContent = `Created: ${new Date(
      post.created
    ).toLocaleDateString()}`;

    // Create and set up the "Read More" button (button)
    const button = document.createElement("button");
    button.classList.add("button");
    button.textContent = "Read More!";

    // Append all elements to the postLink > postElement > grid container
    postLink.appendChild(title);
    postLink.appendChild(image);
    postLink.appendChild(author);
    postLink.appendChild(createdDate);
    postLink.appendChild(button);

    postElement.appendChild(postLink);

    container.appendChild(postElement);
  });
}
