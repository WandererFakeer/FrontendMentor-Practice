// DOM references
const shareButtonEl = document.querySelector(".share-button");
const socialLinksToolTipEl = document.querySelector(
  ".social-links-tooltip-invisible",
);

function shareLinksFunction() {
  socialLinksToolTipEl.classList.toggle("social-links-tooltip-invisible");
  socialLinksToolTipEl.classList.toggle("social-links-tooltip-visible");
}

// Event listener
shareButtonEl.addEventListener("click", shareLinksFunction);
