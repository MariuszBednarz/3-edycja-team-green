const BASE_URL = "https://swapi.dev/api/";
let api;
const state = {
  buttons: [],
  detailContainer: [],
};
let currentCollection;
let currentDataContainer;
let currentDetails;
let currentTableContainer = [];
let currentPage = 1;
let currentTableCount = 10;

class Base {
  constructor(name, created, url) {
    this.name = name;
    this.created = created;
    this.url = url;
  }
}

class Person extends Base {
  constructor(name, created, url, height, mass, gender) {
    super(name, created, url);
    this.height = height;
    this.mass = mass;
    this.gender = gender;
  }
}

class Planet extends Base {
  constructor(
    name,
    created,
    url,
    rotation_period,
    orbital_period,
    diameter,
    climate
  ) {
    super(name, created, url);

    this.rotation_period = rotation_period;
    this.orbital_period = orbital_period;
    this.diameter = diameter;
    this.climate = climate;
  }
}

class Film {
  constructor(title, episode_id, release_date, created, url) {
    this.title = title;
    this.episode_id = episode_id;
    this.release_date = release_date;
    this.created = created;
    this.url = url;
  }
}

class Specie extends Base {
  constructor(name, created, url, classification, designation, average_height) {
    super(name, created, url);

    this.classification = classification;
    this.designation = designation;
    this.average_height = average_height;
  }
}

class Vehicle extends Base {
  constructor(name, created, url, model, manufacturer) {
    super(name, created, url);

    this.model = model;
    this.manufacturer = manufacturer;
  }
}

class Starship extends Base {
  constructor(name, created, url, model, manufacturer, hyperdrive_rating) {
    super(name, created, url);

    this.model = model;
    this.manufacturer = manufacturer;
    this.hyperdrive_rating = hyperdrive_rating;
  }
}

const playButton = document.getElementById("play");
const loader = document.getElementById("loader");
const header = document.getElementById("header");
const contentContainer = document.getElementById("content");
const returnButton = document.getElementById("returnButton");
const tableSpace = document.getElementById("tableSpace");
const mainContainer = document.getElementById("main-container");
const detailContainer = document.getElementById("detailContainer");
const playSound = document.getElementById("playSound");
const bootSound = document.getElementById("bootSound");
const hoverSound = document.getElementById("hoverSound");
const clickSound = document.getElementById("clickSound");
const rowHoverSound = document.getElementById("rowHoverSound");
const soundButtonsContainer = document.getElementById("soundButtons");
const mutedButton = document.getElementById("mutedButton");
const unmutedButton = document.getElementById("unmutedButton");
const sounds = document.getElementsByTagName("audio");
const detailHider = document.getElementById("detailHider");
const borderBar = document.getElementById("borderBar");
const screen = document.getElementById("screen");

window.addEventListener("load", () => {
  bootSound.play();
});

playButton.addEventListener("click", () => {
  playSound.play();
  playButton.style.animation = "button-disappear 3s";
  playButton.style.animationFillMode = "both";
  setTimeout(() => {
    playButton.style.display = "none";
  }, 3000);
  setTimeout(() => {
    loader.style.display = "flex";
    loader.style.animation = "appear 1s";
    loader.style.animationFillMode = "both";
  }, 4000);
  setTimeout(() => {
    loader.style.animation = "disappear 1s";
    loader.style.animationFillMode = "both";
    loader.style.display = "none";
  }, 7000);
  setTimeout(() => {
    initiation();
    header.style.display = "flex";
    header.style.animation = "appear 1s";
    header.style.animationFillMode = "both";
  }, 8000);
});
returnButton.addEventListener("click", returnToCollections);

function returnToCollections() {
  if (loader.style.display == "flex") {
    loader.style.animation = "disappear 1s";
    loader.style.animationFillMode = "both";
    loader.style.display = "none";
  }
  contentContainer.style.animation = "disappear 1s";
  contentContainer.style.animationFillMode = "both";
  setTimeout(() => {
    contentContainer.style.display = "none";
    header.style.display = "flex";
    header.style.animation = "appear 1s";
    header.style.animationFillMode = "both";
  }, 1000);
}

unmutedButton.addEventListener("click", () => {
  mutedButton.style.display = "inline";
  unmutedButton.style.display = "none";
  mutedButton.style.animation = "none";
  for (let i = 0; i < sounds.length; i++) {
    sounds[i].muted = true;
  }
});

mutedButton.addEventListener("click", () => {
  unmutedButton.style.display = "inline";
  mutedButton.style.display = "none";
  unmutedButton.style.animation = "none";
  for (let i = 0; i < sounds.length; i++) {
    sounds[i].muted = false;
  }
});

async function initiation() {
  const response = await fetch(BASE_URL);
  const data = await response.json();
  api = data;
  renderHeaderButtons(data);
}

async function loadCollection(collection) {
  const response = await fetch(collection);
  const rawData = await response.json();
  currentCollection = rawData;
  dataContainerFiller();
}

async function dataContainerFiller() {
  if (currentCollection.results[0].gender !== undefined) {
    currentDataContainer = [];
    fillWithPeople(currentCollection);
  } else if (currentCollection.results[0].rotation_period !== undefined) {
    currentDataContainer = [];
    fillWithPlanets(currentCollection);
  } else if (currentCollection.results[0].episode_id !== undefined) {
    currentDataContainer = [];
    currentCollection.results.forEach((element) => {
      currentRecord = new Film(
        element.title,
        element.episode_id,
        element.release_date,
        element.created,
        element.url
      );
      currentDataContainer.push(currentRecord);
      loader.style.animation = "disappear 1s";
      loader.style.animationFillMode = "both";
      loader.style.display = "none";
      createTable();
    });
  } else if (currentCollection.results[0].average_height !== undefined) {
    currentDataContainer = [];
    fillWithSpecies(currentCollection);
  } else if (currentCollection.results[0].hyperdrive_rating !== undefined) {
    currentDataContainer = [];
    fillWithStarships(currentCollection);
  } else {
    currentDataContainer = [];
    fillWithVehicles(currentCollection);
  }
}

function createTable() {
  tableSpace.innerHTML = "";
  currentTableContainer = [];

  const table = document.createElement("table");
  table.setAttribute("class", "table");

  tableSpace.appendChild(table);

  let index = (currentPage - 1) * currentTableCount;

  const firstRow = document.createElement("tr");
  table.appendChild(firstRow);

  const arrayOfKeys = Object.keys(currentDataContainer[0]);
  const indexOfCreated = arrayOfKeys.indexOf("created");
  changePosition(arrayOfKeys, indexOfCreated, arrayOfKeys.length - 1);

  const indexColumn = document.createElement("th");
  indexColumn.innerHTML = "INDEX";
  firstRow.appendChild(indexColumn);

  arrayOfKeys.forEach((element) => {
    if (element !== "url") {
      const property = document.createElement("th");
      property.innerHTML = element.toUpperCase();
      firstRow.appendChild(property);
    }
  });

  const actionColumn = document.createElement("th");
  actionColumn.innerHTML = "ACTIONS";
  firstRow.appendChild(actionColumn);

  currentTableContainer = currentDataContainer.filter((element, index) => {
    if (currentPage == 1) {
      if (index < currentTableCount) {
        return element;
      }
    } else {
      if (
        index >= (currentPage - 1) * currentTableCount &&
        index <= currentPage * currentTableCount - 1
      ) {
        return element;
      }
    }
  });

  if (currentTableContainer.length == currentTableCount) {
    currentTableContainer.forEach((element) => {
      const row = document.createElement("tr");
      row.setAttribute("class", "tableRow");
      row.addEventListener("mouseover", () => {
        rowHoverSound.play();
      });
      table.appendChild(row);

      index++;
      const indexOfRecord = document.createElement("td");
      indexOfRecord.innerHTML = index;
      row.appendChild(indexOfRecord);

      const arrayOfEntries = Object.entries(element);

      changePosition(arrayOfEntries, indexOfCreated, arrayOfEntries.length - 1);

      arrayOfEntries.forEach(([key, value]) => {
        if (key !== "url") {
          if (key == "created") {
            const newDate = dateCorrect(value);

            const valueCell = document.createElement("td");
            valueCell.innerHTML = newDate;
            row.appendChild(valueCell);
          } else {
            const valueCell = document.createElement("td");
            valueCell.innerHTML = value;
            row.appendChild(valueCell);
          }
        }
      });

      const buttonCell = document.createElement("td");
      row.appendChild(buttonCell);

      const deleteButton = document.createElement("button");
      deleteButton.setAttribute("class", "smallButtons");
      deleteButton.innerHTML = "Delete";
      deleteButton.addEventListener("click", function () {
        const overlay = document.createElement("div");
        overlay.setAttribute("id", "overlay");
        screen.appendChild(overlay);

        soundButtonsContainer.style.zIndex = 0;

        const modal = document.createElement("div");
        modal.setAttribute("class", "modal");
        modal.setAttribute("id", modal);
        screen.appendChild(modal);

        const modalQuestion = document.createElement("div");
        modalQuestion.innerHTML = "Are you sure?";
        modal.appendChild(modalQuestion);

        const modalButtonBox = document.createElement("div");
        modal.appendChild(modalButtonBox);

        const yesButton = document.createElement("button");
        yesButton.innerHTML = "Yes";
        yesButton.setAttribute("class", "button");
        yesButton.addEventListener("click", function () {
          row.style.display = "none";
          modal.style.display = "none";
          modal.innerHTML = "";
          overlay.style.display = "none";
          soundButtonsContainer.style.zIndex = 1;
        });
        modalButtonBox.appendChild(yesButton);

        const noButton = document.createElement("button");
        noButton.innerHTML = "No";
        noButton.setAttribute("class", "button");
        noButton.addEventListener("click", function () {
          modal.style.display = "none";
          modal.innerHTML = "";
          overlay.style.display = "none";
          soundButtonsContainer.style.zIndex = 1;
        });
        modalButtonBox.appendChild(noButton);
      });
      buttonCell.appendChild(deleteButton);

      const detailButton = document.createElement("button");
      detailButton.setAttribute("class", "smallButtons");
      detailButton.innerHTML = "Details";
      detailButton.addEventListener("click", function () {
        detailContainer.innerHTML = "";
        loadDetails(element.url);
        detailHider.style.display = "flex";
        borderBar.style.display = "flex";
        borderBar.style.animation = "borderBar-appear 1s";
        borderBar.style.animationFillMode = "both";
        setTimeout(() => {
          detailContainer.style.right = "0%";
        }, 1000);
      });
      buttonCell.appendChild(detailButton);
    });
  } else {
    const emptyCellCount = currentTableCount - currentTableContainer.length;

    currentTableContainer.forEach((element) => {
      const row = document.createElement("tr");
      row.setAttribute("class", "tableRow");
      row.addEventListener("mouseover", () => {
        rowHoverSound.play();
      });
      table.appendChild(row);

      index++;
      const indexOfRecord = document.createElement("td");
      indexOfRecord.innerHTML = index;
      row.appendChild(indexOfRecord);

      const arrayOfEntries = Object.entries(element);

      changePosition(arrayOfEntries, indexOfCreated, arrayOfEntries.length - 1);

      arrayOfEntries.forEach(([key, value]) => {
        if (key !== "url") {
          if (key == "created") {
            const newDate = dateCorrect(value);

            const valueCell = document.createElement("td");
            valueCell.innerHTML = newDate;
            row.appendChild(valueCell);
          } else {
            const valueCell = document.createElement("td");
            valueCell.innerHTML = value;
            row.appendChild(valueCell);
          }
        }
      });

      const buttonCell = document.createElement("td");
      row.appendChild(buttonCell);

      const deleteButton = document.createElement("button");
      deleteButton.setAttribute("class", "smallButtons");
      deleteButton.innerHTML = "Delete";
      deleteButton.addEventListener("click", function () {
        const overlay = document.createElement("div");
        overlay.setAttribute("id", "overlay");
        screen.appendChild(overlay);

        const modal = document.createElement("div");
        modal.setAttribute("class", "modal");
        modal.setAttribute("id", modal);
        screen.appendChild(modal);

        const modalQuestion = document.createElement("div");
        modalQuestion.innerHTML = "Are you sure?";
        modal.appendChild(modalQuestion);

        const modalButtonBox = document.createElement("div");
        modal.appendChild(modalButtonBox);

        const yesButton = document.createElement("button");
        yesButton.innerHTML = "Yes";
        yesButton.setAttribute("class", "button");
        yesButton.addEventListener("click", function () {
          row.style.display = "none";
          modal.style.display = "none";
          modal.innerHTML = "";
          overlay.style.display = "none";
        });
        modalButtonBox.appendChild(yesButton);

        const noButton = document.createElement("button");
        noButton.innerHTML = "No";
        noButton.setAttribute("class", "button");
        noButton.addEventListener("click", function () {
          modal.style.display = "none";
          modal.innerHTML = "";
          overlay.style.display = "none";
        });
        modalButtonBox.appendChild(noButton);
      });
      buttonCell.appendChild(deleteButton);

      const detailButton = document.createElement("button");
      detailButton.setAttribute("class", "smallButtons");
      detailButton.innerHTML = "Details";
      detailButton.addEventListener("click", function () {
        detailContainer.innerHTML = "";
        loadDetails(element.url);
        detailHider.style.display = "flex";
        borderBar.style.display = "flex";
        borderBar.style.animation = "borderBar-appear 1s";
        borderBar.style.animationFillMode = "both";
        setTimeout(() => {
          detailContainer.style.right = "0%";
        }, 1000);
      });
      buttonCell.appendChild(detailButton);
    });
    for (let i = 0; i < emptyCellCount; i++) {
      const emptyRow = document.createElement("tr");
      table.appendChild(emptyRow);

      Object.keys(currentDataContainer[0]).forEach((key) => {
        if (key !== "url") {
          const emptyCell = document.createElement("td");
          emptyCell.innerHTML = "none";
          emptyCell.style.visibility = "hidden";
          emptyRow.appendChild(emptyCell);
        }
      });
    }
  }
}

function renderHeaderButtons(APIData) {
  Object.entries(APIData).forEach(([key, value]) => {
    const button = document.createElement("button");
    button.setAttribute("class", "collectionButton");
    button.innerHTML = key.toUpperCase();
    button.addEventListener("mouseover", function () {
      hoverSound.play();
    });
    button.addEventListener("click", function () {
      clickSound.play();

      currentPage = 1;
      loadCollection(value);
      navBar();
      header.style.animation = "disappear 1s";
      header.style.animationFillMode = "both";
      header.style.display = "none";
      tableSpace.innerHTML = "";
      contentContainer.style.display = "flex";
      contentContainer.style.animation = "appear 1s";
      contentContainer.style.animationFillMode = "both";
      loader.style.display = "flex";
      loader.style.animation = "appear 1s";
      loader.style.animationFillMode = "both";
    });
    buttons.appendChild(button);
    state.buttons.push(button);
  });
}

async function loadDetails(url) {
  currentDetails = null;
  response = await fetch(url);
  currentDetails = await response.json();

  detailContainer.innerHTML = "";

  const table = document.createElement("table");
  detailContainer.appendChild(table);

  const detailsEntries = Object.entries(currentDetails);
  detailsEntries.forEach(([key, value]) => {
    if (key !== "url" && key !== "edited" && key !== "opening_crawl") {
      if (typeof value === "object") {
        const row = document.createElement("tr");
        table.appendChild(row);

        const detailProperty = document.createElement("td");
        detailProperty.setAttribute("id", "detailKey");
        detailProperty.innerHTML = key;
        row.appendChild(detailProperty);

        const detailValue = document.createElement("td");
        row.appendChild(detailValue);

        const listofNames = document.createElement("ul");
        detailValue.appendChild(listofNames);

        const arrayofLinks = linkListLoader(value);

        arrayofLinks.forEach((element) => {
          const nameOnList = document.createElement("li");
          nameOnList.innerHTML = element;
          listofNames.appendChild(nameOnList);
        });
      } else if (key === "created") {
        const row = document.createElement("tr");

        table.appendChild(row);

        const detailProperty = document.createElement("td");
        detailProperty.setAttribute("id", "detailKey");
        detailProperty.innerHTML = key;
        row.appendChild(detailProperty);

        const detailValue = document.createElement("td");
        detailValue.innerHTML = dateCorrect(value);
        row.appendChild(detailValue);
      } else {
        const row = document.createElement("tr");

        table.appendChild(row);

        const detailProperty = document.createElement("td");
        detailProperty.setAttribute("id", "detailKey");
        detailProperty.innerHTML = key;
        row.appendChild(detailProperty);

        const detailValue = document.createElement("td");
        detailValue.innerHTML = value;
        row.appendChild(detailValue);
      }
    }
  });
  const closeButton = document.createElement("button");
  closeButton.innerHTML = "Close";
  closeButton.addEventListener("click", function () {
    detailContainer.style.right = "100%";
    borderBar.style.animation = "borderBar-disappear 1s";
    borderBar.style.animationFillMode = "both";
    borderBar.style.animationDelay = "1s";
    setTimeout(() => {
      borderBar.style.display = "none";
      detailHider.style.display = "none";
    }, 2000);
  });
  closeButton.setAttribute("class", "closeButton");
  detailContainer.appendChild(closeButton);
}

function changePosition(arr, from, to) {
  if (to >= arr.length) {
    return arr;
  }

  arr.splice(to, 0, arr.splice(from, 1)[0]);
  return arr;
}

function dateCorrect(date) {
  const arrayOfDate = date.split("");
  arrayOfDate.splice(10, Infinity);
  const year = arrayOfDate.splice(0, 4);
  const month = arrayOfDate.splice(1, 2);
  const day = arrayOfDate.splice(2, 2);

  return day.concat("-").concat(month).concat("-").concat(year).join(``);
}

function linkListLoader(urlList) {
  const arrayOfNames = [];
  urlList.forEach((element) => {
    let urlData;
    fetch(element)
      .then((response) => response.json())
      .then((data) => {
        if (data.name == undefined) {
          urlData = data.title;
        } else {
          urlData = data.name;
        }
        arrayOfNames.push(urlData);
      });
  });
  return arrayOfNames;
}

async function linkNameLoader(url) {
  const response = await fetch(url);
  const data = await response.json();
  if (data.name == undefined) {
    return data.title;
  } else {
    return data.name;
  }
}

async function fillWithPeople(collection) {
  if (collection.next === undefined || collection.next === null) {
    collection.results.forEach((element) => {
      currentRecord = new Person(
        element.name,
        element.created,
        element.url,
        element.height,
        element.mass,
        element.gender
      );
      currentDataContainer.push(currentRecord);
      loader.style.animation = "disappear 1s";
      loader.style.animationFillMode = "both";
      loader.style.display = "none";
      createTable();
    });
  } else {
    collection.results.forEach((element) => {
      currentRecord = new Person(
        element.name,
        element.created,
        element.url,
        element.height,
        element.mass,
        element.gender
      );
      currentDataContainer.push(currentRecord);
    });
    const response = await fetch(collection.next);
    const nextCollection = await response.json();

    fillWithPeople(nextCollection);
  }
}

async function fillWithPlanets(collection) {
  if (collection.next === undefined || collection.next === null) {
    currentCollection.results.forEach((element) => {
      currentRecord = new Planet(
        element.name,
        element.created,
        element.url,
        element.rotation_period,
        element.orbital_period,
        element.diameter,
        element.climate
      );
      currentDataContainer.push(currentRecord);
      loader.style.animation = "disappear 1s";
      loader.style.animationFillMode = "both";
      loader.style.display = "none";
      createTable();
    });
  } else {
    collection.results.forEach((element) => {
      currentRecord = new Planet(
        element.name,
        element.created,
        element.url,
        element.rotation_period,
        element.orbital_period,
        element.diameter,
        element.climate
      );
      currentDataContainer.push(currentRecord);
    });
    const response = await fetch(collection.next);
    const nextCollection = await response.json();

    fillWithPlanets(nextCollection);
  }
}

async function fillWithSpecies(collection) {
  if (collection.next === undefined || collection.next === null) {
    collection.results.forEach((element) => {
      currentRecord = new Specie(
        element.name,
        element.created,
        element.url,
        element.classification,
        element.designation,
        element.average_height
      );
      currentDataContainer.push(currentRecord);
      loader.style.animation = "disappear 1s";
      loader.style.animationFillMode = "both";
      loader.style.display = "none";
      createTable();
    });
  } else {
    collection.results.forEach((element) => {
      currentRecord = new Specie(
        element.name,
        element.created,
        element.url,
        element.classification,
        element.designation,
        element.average_height
      );
      currentDataContainer.push(currentRecord);
    });
    const response = await fetch(collection.next);
    const nextCollection = await response.json();

    fillWithSpecies(nextCollection);
  }
}

async function fillWithStarships(collection) {
  if (collection.next === undefined || collection.next === null) {
    collection.results.forEach((element) => {
      currentRecord = new Starship(
        element.name,
        element.created,
        element.url,
        element.model,
        element.manufacturer,
        element.hyperdrive_rating
      );
      currentDataContainer.push(currentRecord);
      loader.style.animation = "disappear 1s";
      loader.style.animationFillMode = "both";
      loader.style.display = "none";
      createTable();
    });
  } else {
    collection.results.forEach((element) => {
      currentRecord = new Starship(
        element.name,
        element.created,
        element.url,
        element.model,
        element.manufacturer,
        element.hyperdrive_rating
      );
      currentDataContainer.push(currentRecord);
    });
    const response = await fetch(collection.next);
    const nextCollection = await response.json();

    fillWithStarships(nextCollection);
  }
}

async function fillWithVehicles(collection) {
  if (collection.next === undefined || collection.next === null) {
    collection.results.forEach((element) => {
      currentRecord = new Vehicle(
        element.name,
        element.created,
        element.url,
        element.model,
        element.manufacturer
      );
      currentDataContainer.push(currentRecord);
      loader.style.animation = "disappear 1s";
      loader.style.animationFillMode = "both";
      loader.style.display = "none";
      createTable();
    });
  } else {
    collection.results.forEach((element) => {
      currentRecord = new Vehicle(
        element.name,
        element.created,
        element.url,
        element.model,
        element.manufacturer
      );
      currentDataContainer.push(currentRecord);
    });
    const response = await fetch(collection.next);
    const nextCollection = await response.json();

    fillWithVehicles(nextCollection);
  }
}

function navBar() {
  const navBar = document.getElementById("navBar");
  navBar.style.display = "flex";
  tableCountView();
  navButtonChecker();
  navInputChecker();

  const nextButton = document.getElementById("nextButton");
  nextButton.addEventListener("click", nextPageLoader);

  const prevButton = document.getElementById("prevButton");
  prevButton.addEventListener("click", prevPageLoader);

  const pageInput = document.getElementById("pageInput");
  const navInputSubmit = document.getElementById("navInputSubmit");
  navInputSubmit.addEventListener("click", function () {
    const numberValue = parseInt(pageInput.value);
    if (!isNaN(numberValue)) {
      currentPage = pageInput.value;
      createTable();
      navButtonChecker();
    } else {
      alert("Please enter a valid number");
    }
  });
}

function nextPageLoader() {
  currentPage++;
  createTable();
  navButtonChecker();
  navInputChecker();
}

function prevPageLoader() {
  if (currentPage == 1) {
  } else {
    currentPage--;
    createTable();
    navButtonChecker();
    navInputChecker();
  }
}

function navButtonChecker() {
  if (currentTableContainer.length != currentTableCount) {
    nextButton.style.display = "none";
  } else {
    nextButton.style.display = "flex";
  }
  if (currentPage == 1) {
    prevButton.style.display = "none";
    nextButton.style.display = "flex";
  } else {
    prevButton.style.display = "flex";
  }
}

function navInputChecker() {
  const pageInput = document.getElementById("pageInput");
  pageInput.value = currentPage;
}

function tableCountView() {
  const tableCountSelector = document.getElementById("tableCountSelect");
  tableCountSelector.style.display = "flex";
  tableCountSelector.addEventListener("change", function () {
    const selectedIndex = tableCountSelector.value;
    currentTableCount = selectedIndex;
    if (selectedIndex > 20) {
      tableSpace.style.overflow = "scroll";
    } else {
      tableSpace.style.overflow = "hidden";
    }

    createTable();
    navButtonChecker();
    navInputChecker();
  });
}
