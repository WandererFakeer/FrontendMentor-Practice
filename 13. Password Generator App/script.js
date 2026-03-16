import { uppercaseAlphabetsArray, lowercaseAlphabetsArray, numbersArray, symbolsArray } from "./data.js";

// DOM references
const password = document.querySelector("#password");
const copyPasswordText = document.querySelector("#copy-password-text");
const iconCopyButton = document.querySelector("#icon-copy-button");
const form = document.querySelector("#form");
const showLength = document.querySelector("#show-length");
const iconCheckUppercase = document.querySelector("#icon-check-uppercase");
const iconCheckLowercase = document.querySelector("#icon-check-lowercase");
const iconCheckNumber = document.querySelector("#icon-check-number");
const iconCheckSymbol = document.querySelector("#icon-check-symbol");
const strengthClassification = document.querySelector("#strength-classification");
const strengthRectangles = document.querySelectorAll(".strength-rectangle");
const generate = document.querySelector("#generate");

const state = {
  userChoiceCharLength: 0,
  hasUppercase: false,
  hasLowercase: false,
  hasNumber: false,
  hasSymbol: false,
  randomPassword: "",
  copiedPassword: "",
  strength: "",
};

// Render
function render() {
  password.classList.toggle("password-block-padding", state.randomPassword.length > 0);
  password.textContent = state.randomPassword;
  copyPasswordText.textContent = state.copiedPassword;
  showLength.textContent = state.userChoiceCharLength;

  // All the checkboxes get hidden or unhidden based on state
  iconCheckUppercase.hidden = !state.hasUppercase;
  iconCheckLowercase.hidden = !state.hasLowercase;
  iconCheckNumber.hidden = !state.hasNumber;
  iconCheckSymbol.hidden = !state.hasSymbol;

  strengthClassification.textContent = state.strength;

  const strengthMap = {
    "": { count: 0, class: null },
    "Too Weak!": { count: 1, class: "rectangle-one" },
    Weak: { count: 2, class: "rectangle-two" },
    Medium: { count: 3, class: "rectangle-three" },
    Strong: { count: 4, class: "rectangle-four" },
  };

  const activeStrengthObject = strengthMap[state.strength] ?? strengthMap[""];

  strengthRectangles.forEach((element, index) => {
    element.classList.remove("rectangle-one", "rectangle-two", "rectangle-three", "rectangle-four");
    element.classList.toggle(activeStrengthObject.class, index < activeStrengthObject.count);
  });
}

// Function to reset data
function resetFromData() {
  state.copiedPassword = "";
}

// Function to get data from FormData
function getData() {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  // Get all the entries of "user-choices" with .getAll()
  data["user-choices"] = formData.getAll("user-choices");
  return data;
}

// Function to handle form change
function handleFormChange() {
  const data = getData();

  state.userChoiceCharLength = Number(data["slider"]);

  const userChoices = data["user-choices"];

  state.hasUppercase = userChoices.includes("uppercase");

  state.hasLowercase = userChoices.includes("lowercase");

  state.hasNumber = userChoices.includes("number");

  state.hasSymbol = userChoices.includes("symbol");

  render();
}

// Function to get a random number from a given number range
function generateRandomIntegerFromRange(range) {
  return Math.floor(Math.random() * range);
}

// Function to get random element from an array
function randomElement(array) {
  const randomIndex = generateRandomIntegerFromRange(array.length);
  return array[randomIndex];
}

// Function to get user chosen arrays based on conditionals
function chosenArraysPool(userChoicesArray, expectedLength) {
  // Get enabled user choices object
  const enabledChoicesArray = userChoicesArray.filter((object) => object.enabled);

  // Get the number of enabled user choices
  const enabledChoicesNumber = enabledChoicesArray.length;

  // Ensure the character length is not 0, or the character length is greater than or equal to the number of choices (Ex - if user chooses length 2 for characters, then they can at max choose 2 options from the given 4 options)
  if (!expectedLength || expectedLength < enabledChoicesNumber) {
    return [[], []];
  }

  // Get the combined arrays of all of the types of choices made by user
  const combinedSelectionPool = enabledChoicesArray.map((object) => object.pool);

  // Get array, where at least one element from each of the chosen option is there
  const eachChosenOptionsArray = enabledChoicesArray.map((object) => randomElement(object.pool));

  // Flatten "combinedSelectionPool" to 1D array
  const combinedSelectionPoolFlat = combinedSelectionPool.flat(1);

  return [combinedSelectionPoolFlat, eachChosenOptionsArray];
}

// Function to generate an array from a given array
function generateArrayFromArray(length, array) {
  const returnedArray = [];

  for (let i = 0; i < length; i++) {
    returnedArray.push(randomElement(array));
  }

  return returnedArray;
}

// Function to shuffle array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let randomIndex = generateRandomIntegerFromRange(i + 1);

    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }

  return array;
}

// Function to get the strength
function getStrength(combinedSelectionPool, length) {
  const arrayPoolLength = combinedSelectionPool.length;
  const bitOfEntropy = Math.log2(arrayPoolLength) * length;

  if (bitOfEntropy <= 72) {
    return "Too Weak!";
  } else if (bitOfEntropy <= 85) {
    return "Weak";
  } else if (bitOfEntropy <= 100) {
    return "Medium";
  }
  return "Strong";
}

// Function to handle password
function handlePasswordGeneration() {
  // Get the respective full arrays of all the chosen options, and the array containing one character from each of the chosen option
  const [combinedSelectionPool, eachChosenOptionsArray] = chosenArraysPool(
    [
      { enabled: state.hasUppercase, pool: uppercaseAlphabetsArray },
      { enabled: state.hasLowercase, pool: lowercaseAlphabetsArray },
      { enabled: state.hasNumber, pool: numbersArray },
      { enabled: state.hasSymbol, pool: symbolsArray },
    ],
    state.userChoiceCharLength,
  );

  if (combinedSelectionPool.length === 0) {
    return;
  }

  const remainingPasswordLength = state.userChoiceCharLength - eachChosenOptionsArray.length;

  // Get the remaining elements of the password array
  const remainingPasswordArray = generateArrayFromArray(remainingPasswordLength, combinedSelectionPool);

  // Get the full un-shuffled password array
  const fullPasswordArray = [...eachChosenOptionsArray, ...remainingPasswordArray];

  // Get the shuffled array, and make it string
  state.randomPassword = shuffle(fullPasswordArray).join("");

  state.strength = getStrength(combinedSelectionPool, state.userChoiceCharLength);

  // Reset data
  resetFromData();

  render();
}

// Function to handle copy to clipboard
async function handleCopyToClipboard() {
  try {
    await navigator.clipboard.writeText(state.randomPassword);
    state.copiedPassword = state.randomPassword ? "copied" : "";
  } catch (err) {
    console.error(`Failed to copy: ${err}`);
  }

  render();
}

render();

// Event listeners
form.addEventListener("change", handleFormChange);

generate.addEventListener("click", handlePasswordGeneration);

iconCopyButton.addEventListener("click", handleCopyToClipboard);
