// DOM references
const shareButtonEl = document.querySelector("#share-button");
const socialLinksToolTipEl = document.querySelector(
  "#social-links-tooltip-invisible",
);
const statusAnnounce = document.querySelector("#share-status");

function shareLinksFunction() {
  socialLinksToolTipEl.classList.toggle("social-links-tooltip-invisible");
  socialLinksToolTipEl.classList.toggle("social-links-tooltip-visible");

  // Screen reader announcement
  statusAnnounce.textContent = socialLinksToolTipEl.classList.contains(
    "social-links-tooltip-invisible",
  )
    ? "Share options hidden."
    : "Share options shown.";
}

// Event listener
shareButtonEl.addEventListener("click", shareLinksFunction);
