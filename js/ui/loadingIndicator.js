export function loadingIndicator() {
    var loadingElement = document.getElementById("loading-indicator");
  
    if (loadingElement) {
      // Show the loading indicator when the page starts loading
      window.addEventListener('load', function() {
        loadingElement.style.display = "flex";
        setTimeout(function () {
          loadingElement.style.opacity = "1"; 
        }, 10);
      });
  
      // Hide the loading indicator once the DOM is fully loaded
      document.addEventListener("DOMContentLoaded", function() {
        loadingElement.style.opacity = "0";
        setTimeout(function () {
          loadingElement.style.display = "none";
        }, 300);
      });
    }
  }
  