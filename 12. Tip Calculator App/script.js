import CURRENCY_SYMBOL from "./currencyData.js";

// DOM references
const form = document.querySelector("#form");
const tipWrapper = document.querySelector(".tip-wrapper");
const customInputWrapper = document.querySelector(".custom-tip-wrapper");
const headsInput = document.querySelector("#heads-input");
const wrongInputAlert = document.querySelector("#wrong-input-alert");
const tipPerPerson = document.querySelector("#tip-per-person");
const totalPerPerson = document.querySelector("#total-per-person");
const button = document.querySelector("#button");

const state = {
  billAmount: 0,
  tipPercent: 0,
  tipPercentCustom: "",
  numberOfPeople: null,
  localCurrency: "",
  perPersonTipAmount: 0,
  perPersonTotalAmount: 0,
};

// Function to get the currency of the place
async function getCurrency() {
  const response = await fetch("https://api.techniknews.net/ipgeo/");
  return await response.json();
}

// Function to set the currency of the place
async function setCurrency() {
  const data = await getCurrency();
  const currency = data?.currency;
  state.localCurrency = CURRENCY_SYMBOL[currency];
}

// Function to hide and unhide existing element
function elementExistence(isCustom, visibleEl, existingInput, parentEl) {
  if (isCustom) {
    visibleEl.hidden = true;

    if (!existingInput) {
      const input = document.createElement("input");
      input.type = "number";
      input.name = "custom-tip";
      input.classList.add("custom-input-place");
      parentEl.append(input);
    }
  } else {
    visibleEl.hidden = false;

    if (existingInput) {
      existingInput.remove();
    }
  }
}

// Function to validate value with alert
function checkValidity(hasValue, validInput, alertText, inputArea) {
  if (!hasValue || validInput) {
    alertText.textContent = "";
    inputArea.classList.remove("invalid-input");
  } else {
    alertText.textContent = "Can't be zero";
    inputArea.classList.add("invalid-input");
  }
}

// Render
function render() {
  // If user uses the "custom" tip % -
  // check if any element with class "custom-input-place" is existing or not
  // If it it does not exist -
  // make "custom" hidden
  // create "input" element -
  // with "type" as "number",
  // "name" as "custom-tip" (different from the radio buttons, so that either this input or a radio button gets selected at a time)
  // add class "custom-input-place"
  // append this input to its parent "tipWrapper"
  const existingCustomInput = document.querySelector(".custom-input-place");
  elementExistence(
    state.tipPercentCustom === "custom",
    customInputWrapper,
    existingCustomInput,
    tipWrapper,
  );

  // Check if user entered any input or not
  const hasNumOfPeopleValue = headsInput.value !== "";

  // Valid input will be only if the user has input a value which is greater than 0
  const validInput = state.numberOfPeople > 0;

  //validate value with alert
  checkValidity(hasNumOfPeopleValue, validInput, wrongInputAlert, headsInput);

  button.disabled = !(state.numberOfPeople > 0);

  tipPerPerson.textContent = !(state.numberOfPeople > 0)
    ? `${state.localCurrency}0.00`
    : `${state.localCurrency}${state.perPersonTipAmount}`;

  totalPerPerson.textContent = !(state.numberOfPeople > 0)
    ? `${state.localCurrency}0.00`
    : `${state.localCurrency}${state.perPersonTotalAmount}`;
}

// Function to grab all user entered data
function returnData() {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  return data;
}

// Function to set user entered data in state
function getData() {
  const data = returnData();

  state.billAmount = Number(data.bill);

  if (data["tip-percent"] === "custom") {
    state.tipPercent = Number(data["custom-tip"] || 0);
    state.tipPercentCustom = "custom";
  } else {
    state.tipPercent = Number(data["tip-percent"].replace("%", "") || 0);
    state.tipPercentCustom = "";
  }

  state.numberOfPeople = Number(data.heads);
}

// Function to calculate amount
function findCalculatedNumber(totalAmount, percentage, number) {
  return (totalAmount * percentage) / (100 * number);
}

// Function to get amount
function getAmount() {
  getData();

  if (state.numberOfPeople > 0) {
    state.perPersonTipAmount = findCalculatedNumber(
      state.billAmount,
      state.tipPercent,
      state.numberOfPeople,
    ).toFixed(2);

    state.perPersonTotalAmount = findCalculatedNumber(
      state.billAmount,
      state.tipPercent + 100,
      state.numberOfPeople,
    ).toFixed(2);
  }

  render();
}

// Function to reset all data
function resetData() {
  form.reset();
  state.billAmount = 0;
  state.tipPercent = 0;
  state.tipPercentCustom = "";
  state.numberOfPeople = null;
  state.perPersonTipAmount = 0;
  state.perPersonTotalAmount = 0;

  render();
}

// Function to lead initially
async function initial() {
  await setCurrency();
  render();
}

initial();

// Event listeners
form.addEventListener("input", getAmount);

button.addEventListener("click", resetData);
