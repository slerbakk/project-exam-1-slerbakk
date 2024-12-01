export function createCarousel(posts) {
  const container = document.querySelector(".carousel");
  let currentIndex = 0;

  if (!container) {
    return;
  }
  
  container.innerHTML = "";

// Create carousel items for each post
  posts.forEach((post, index) => {
    const postElement = document.createElement("div");
    postElement.classList.add("carousel-item");
    postElement.setAttribute("data-index", index);

    const postLink = document.createElement("a");
    postLink.href = `/post/index.html?id=${post.id}`;

    const title = document.createElement("h2");
    title.textContent = post.title;

    const image = document.createElement("img");
    image.src = post.media.url;
    image.classList.add("img-large-carouselle");
    image.alt = post.title;

    // Create the button for "Read More"
    const button = document.createElement("button");
    button.classList.add("button-carouselle");
    button.textContent = "Read More";

    // Append the title, image, and button to the postLink
    postLink.appendChild(title);
    postLink.appendChild(image);
    postLink.appendChild(button);

    // Append the postLink to the postElement
    postElement.appendChild(postLink);

    // Append the postElement to the container
    container.appendChild(postElement);
  });

  updateCarousel(0); // Initially show the first post

  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");

  // Update carousel when the previous button is clicked
  if (prevButton) {
    prevButton.addEventListener("click", () => {
      currentIndex = currentIndex === 0 ? posts.length - 1 : currentIndex - 1;
      updateCarousel(currentIndex);
    });
  }

  // Update carousel when the next button is clicked
  if (nextButton) {
    nextButton.addEventListener("click", () => {
      currentIndex = currentIndex === posts.length - 1 ? 0 : currentIndex + 1;
      updateCarousel(currentIndex);
    });
  }
}

// Function to update which post is visible in the carousel
function updateCarousel(index) {
  const carouselItems = document.querySelectorAll(".carousel-item");

  // Show only the item at the current index and hide the others
  carouselItems.forEach((item, i) => {
    item.style.display = i === index ? "block" : "none";
  });
}
