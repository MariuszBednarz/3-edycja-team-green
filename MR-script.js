const BASE_URL = "https://swapi.dev/api/";
let api;
const state = {
  buttons: [],
};
let currentCollection;
let currentDataBin;

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
  constructor(name, created, url, model, manufacturer, cost_in_credits) {
    super(name, created, url);

    this.model = model;
    this.manufacturer = manufacturer;
    this.cost_in_credits = cost_in_credits;
  }
}

class Starship extends Base {
  constructor(
    name,
    created,
    url,
    model,
    manufacturer,
    cost_in_credits,
    hyperdrive_rating
  ) {
    super(name, created, url);

    this.model = model;
    this.manufacturer = manufacturer;
    this.cost_in_credits = cost_in_credits;
    this.hyperdrive_rating = hyperdrive_rating;
  }
}

async function initiation() {
  const response = await fetch(BASE_URL);
  const data = await response.json();
  api = data;
  const buttons = document.getElementById("buttons");
  renderButtons(data);
  console.log(state.buttons);
}
async function loadCollection(collection) {
  const response = await fetch(collection);
  const rawData = await response.json();
  currentCollection = rawData;
  dataBinFiller();
  createTable();
  console.log(currentDataBin);
}

function dataBinFiller() {
  currentDataBin = [];

  let currentRecord;
  if (currentCollection.results[0].gender !== undefined) {
    currentCollection.results.forEach((element) => {
      currentRecord = new Person(
        element.name,
        element.created,
        element.url,
        element.height,
        element.mass,
        element.gender
      );
      currentDataBin.push(currentRecord);
    });
  } else if (currentCollection.results[0].rotation_period !== undefined) {
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
      currentDataBin.push(currentRecord);
    });
  } else if (currentCollection.results[0].episode_id !== undefined) {
    currentCollection.results.forEach((element) => {
      currentRecord = new Film(
        element.title,
        element.episode_id,
        element.release_date,
        element.created,
        element.url
      );
      currentDataBin.push(currentRecord);
    });
  } else if (currentCollection.results[0].average_height !== undefined) {
    currentCollection.results.forEach((element) => {
      currentRecord = new Specie(
        element.name,
        element.created,
        element.url,
        element.classification,
        element.designation,
        element.average_height
      );
      currentDataBin.push(currentRecord);
    });
  } else if (currentCollection.results[0].hyperdrive_rating !== undefined) {
    currentCollection.results.forEach((element) => {
      currentRecord = new Starship(
        element.name,
        element.created,
        element.url,
        element.model,
        element.manufacturer,
        element.cost_in_credits,
        element.hyperdrive_rating
      );
      currentDataBin.push(currentRecord);
    });
  } else {
    currentCollection.results.forEach((element) => {
      currentRecord = new Vehicle(
        element.name,
        element.created,
        element.url,
        element.model,
        element.manufacturer,
        element.cost_in_credits
      );
      currentDataBin.push(currentRecord);
    });
  }
}

function createTable() {
  const content = document.getElementById("content");
  content.innerHTML = "";

  const table = document.createElement("table");
  content.appendChild(table);

  let index = 0;

  const firstRow = document.createElement("tr");
  table.appendChild(firstRow);

  const arrayOfKeys = Object.keys(currentDataBin[0]);
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

  currentDataBin.forEach((element) => {
    const row = document.createElement("tr");
    table.appendChild(row);

    index += 1;
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
    buttonCell.appendChild(deleteButton);

    const detailButton = document.createElement("button");
    detailButton.innerHTML = "Details";
    buttonCell.appendChild(detailButton);
  });
}

function renderButtons(APIData) {
  Object.entries(APIData).map(([key, value]) => {
    const button = document.createElement("button");
    button.innerHTML = key.toUpperCase();
    button.addEventListener("click", function () {
      loadCollection(value);
    });
    buttons.appendChild(button);
    state.buttons.push(button);
  });
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

initiation();
