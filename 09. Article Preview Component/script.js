// DOM references
const shareButtonEl = document.querySelector(".share-button");
const socialLinksEl = document.querySelector(".social-links");

function shareLinksFunction() {
  socialLinksEl.classList.toggle("social-links");
  socialLinksEl.classList.toggle("visible");
}

// Event listener
shareButtonEl.addEventListener("click", shareLinksFunction);
