// DOM references
const daily = document.querySelector("#daily");
const timelineButtons = document.querySelectorAll(".timeline-button");
const toDos = document.querySelector("#to-dos");

// List images and background color
const TODO_SPECIFIC_IMAGE = {
  Work: {
    color: "var(--light-red-work)",
    icon: "./assets/icon-work.svg",
  },

  Play: {
    color: "var(--soft-blue-play)",
    icon: "./assets/icon-play.svg",
  },
  Study: {
    color: "var(--light-red-study)",
    icon: "./assets/icon-study.svg",
  },
  Exercise: {
    color: "var(--lime-green-exercise)",
    icon: "./assets/icon-exercise.svg",
  },
  Social: {
    color: "var(--violet-social)",
    icon: "./assets/icon-social.svg",
  },
  "Self Care": {
    color: "var(--soft-orange-self-care)",
    icon: "./assets/icon-self-care.svg",
  },
};

let state = [];

// Render
function render(time) {
  toDos.innerHTML = "";

  const fragment = document.createDocumentFragment();

  state.forEach((item) => {
    // Add list item
    const listItem = document.createElement("li");
    listItem.classList.add("to-do-list");

    // List item image wrapper
    const todoImageWrapper = document.createElement("div");
    todoImageWrapper.classList.add("to-do-image-wrapper");
    todoImageWrapper.style.backgroundColor =
      TODO_SPECIFIC_IMAGE[item.title].color;

    // List item image
    const todoImage = document.createElement("img");
    todoImage.classList.add("to-do-image");

    todoImage.src = TODO_SPECIFIC_IMAGE[item.title].icon;
    todoImage.alt = `${item.title} icon`;

    // Append list image to its wrapper
    todoImageWrapper.append(todoImage);

    // List item details wrapper
    const todoDetailsWrapper = document.createElement("div");
    todoDetailsWrapper.classList.add("to-do-details-wrapper");

    // List item name and ellipsis wrapper
    const itemNameImage = document.createElement("div");
    itemNameImage.classList.add("name-image-container");

    // To-do name
    const itemName = document.createElement("h3");
    itemName.classList.add("list-item-name");
    itemName.textContent = item.title;

    // To-do ellipsis
    const ellipsis = document.createElement("img");
    ellipsis.src = "./assets/icon-ellipsis.svg";
    ellipsis.alt = "Image of more options ellipsis";

    // Append list name and ellipsis in their wrapper
    itemNameImage.append(itemName, ellipsis);

    // To-do times wrapper
    const itemTimes = document.createElement("div");
    itemTimes.classList.add("time-container");

    // To-do current time
    const itemTimeCurrent = document.createElement("h2");
    itemTimeCurrent.classList.add("list-item-current-time");

    const current = item.timeframes[time].current;
    itemTimeCurrent.textContent = `${current} hrs`;

    // To-do previous time
    const itemTimePrevious = document.createElement("p");
    itemTimePrevious.classList.add("list-item-previous-time");

    const previous = item.timeframes[time].previous;

    // To get "Day", "Week" and "Month" -
    // Split them wih delimiter "ly" to make them array
    // Get the first element, replace the "i" with "y" (As in "Dai" with "Day")
    // Get the first letter, capitalize it, then append it with the rest of the letters
    const timeLine = time.split("ly")[0].replace("i", "y");
    const timeLineCapitalize =
      timeLine.charAt(0).toUpperCase() + timeLine.slice(1);

    itemTimePrevious.textContent = `Last ${timeLineCapitalize} - ${previous} hrs`;

    // Append the times in their wrapper
    itemTimes.append(itemTimeCurrent, itemTimePrevious);

    // Append the name, ellipsis and the times inside their wrapper
    todoDetailsWrapper.append(itemNameImage, itemTimes);

    // Append both wrappers inside list
    listItem.append(todoImageWrapper, todoDetailsWrapper);

    fragment.append(listItem);
  });

  toDos.append(fragment);
}

// Function to get data
async function getData() {
  const response = await fetch("./data.json");

  try {
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Could not fetch data");
  }
}

// Function to set initial data
async function setData() {
  state = await getData();
  render("daily");
}

setData();

// Buttons event listener
timelineButtons.forEach((button) => {
  button.addEventListener("click", () => {
    render(button.dataset.time);
  });
});

