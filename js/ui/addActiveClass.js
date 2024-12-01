export function addActiveClass(navbar) {
    const links = navbar.querySelectorAll("a");
    const currentPath = window.location.pathname;
  
    links.forEach((link) => {
      const linkPath = link.getAttribute("href");
  
      if (
        (currentPath === "/" && linkPath === "/index.html") ||
        currentPath === linkPath
      ) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }