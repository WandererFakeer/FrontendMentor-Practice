// DOM references
const form = document.querySelector("#form");
const input = document.querySelector("input");
const errorMessage = document.querySelector("#error-message");
const newsletterLayout = document.querySelector("#newsletter-layout");
const successLayout = document.querySelector("#success-layout");
const userEmail = document.querySelector("#user-email");

const state = {
  hasError: false,
  invalidData: "",
  userData: "",
};

// Render
function render() {
  errorMessage.textContent = state.invalidData;

  input.classList.toggle("invalid-input", state.hasError);

  userEmail.textContent = state.userData;

  newsletterLayout.hidden = !state.hasError;
  successLayout.hidden = state.hasError;
}

// Function to check user data validity
function inputValidation(userData) {
  return !userData.checkValidity() ? "Valid email required" : "";
}

// Function to get user data
function getFormData(formInput) {
  const formData = new FormData(formInput.target);
  const data = Object.fromEntries(formData);
  state.userData = data?.email;
  return state.userData;
}

// Event listener callback function
function submitFunction(e) {
  // Prevent form submission
  e.preventDefault();

  // Check input validity
  state.invalidData = inputValidation(input);
  state.hasError = Boolean(state.invalidData);

  // Get user data
  getFormData(e);

  render();
}

// Event listener
form.addEventListener("submit", submitFunction);
