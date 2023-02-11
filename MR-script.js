const BASE_URL = "https://swapi.dev/api/";
let api;
const state = {
  buttons: [],
  detailContainer: [],
};
let currentCollection;
let currentDataContainer;
let currentDetails;
let currentTableContainer;
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

async function initiation() {
  const response = await fetch(BASE_URL);
  const data = await response.json();
  api = data;
  const buttons = document.getElementById("buttons");
  renderHeaderButtons(data);
}

async function loadCollection(collection) {
  const response = await fetch(collection);
  const rawData = await response.json();
  currentCollection = rawData;
  console.log(currentCollection);

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
  const tableSpace = document.getElementById("tableSpace");
  tableSpace.innerHTML = "";

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
      deleteButton.innerHTML = "Delete";
      deleteButton.addEventListener("click", function () {
        const mainContainer = document.getElementById("main-container");

        const overlay = document.createElement("div");
        overlay.setAttribute("id", "overlay");
        mainContainer.appendChild(overlay);

        const modal = document.createElement("div");
        modal.setAttribute("class", "modal");
        modal.setAttribute("id", modal);
        mainContainer.appendChild(modal);

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
      detailButton.innerHTML = "Details";
      detailButton.addEventListener("click", function () {
        detailContainer.innerHTML = "";
        loadDetails(element.url);
      });
      buttonCell.appendChild(detailButton);
    });
  } else {
    const emptyCellCount = currentTableCount - currentTableContainer.length;

    currentTableContainer.forEach((element) => {
      const row = document.createElement("tr");
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
      deleteButton.innerHTML = "Delete";
      deleteButton.addEventListener("click", function () {
        const mainContainer = document.getElementById("main-container");

        const overlay = document.createElement("div");
        overlay.setAttribute("id", "overlay");
        mainContainer.appendChild(overlay);

        const modal = document.createElement("div");
        modal.setAttribute("class", "modal");
        modal.setAttribute("id", modal);
        mainContainer.appendChild(modal);

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
      detailButton.innerHTML = "Details";
      detailButton.addEventListener("click", function () {
        detailContainer.innerHTML = "";
        loadDetails(element.url);
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
    button.innerHTML = key.toUpperCase();
    button.addEventListener("click", function () {
      currentPage = 1;
      loadCollection(value);
    });
    buttons.appendChild(button);
    state.buttons.push(button);
  });
}

async function loadDetails(url) {
  currentDetails = null;
  response = await fetch(url);
  currentDetails = await response.json();

  const detailContainer = document.getElementById("detailContainer");
  detailContainer.innerHTML = "";
  detailContainer.style.left = "50%";

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
    detailContainer.style.left = "100%";
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
      createTable();
    });
  }
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
      createTable();
    });
  }
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
      createTable();
    });
  }
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
      createTable();
    });
  }
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

initiation();
