const SWAPI_URL = "https://swapi.dev/api/";
let elementsPerPage = 10; 
let totalElements = 0;
let selectedOption = 10; 




//stan aplikacji
let headerAdded = false;
let currentPage = 1;
let startingIndex = 1;
let currentCategory = "";
// console.log(currentPage);

//1. tu ściągam ogólną listę kategorii
const getButtons = async () => {
  const response = await fetch(`${SWAPI_URL}`);
  const data = await response.json();
  return data;
};

//2. tu deklaruję funkcję która pobierze dane z różnych kategorii po kliknięciu przycisku
const getData = async (category, page) => {
  const response = await fetch(`${SWAPI_URL}/${category}/?page=${page}`);
  const data = await response.json();
  const results = data.results;
  return results;
};



//3. tu generuję przyciski
const generateButtons = async () => {
  const buttons = document.getElementById("buttons");
  const data = await getButtons();
  const names = Object.keys(data);

  //dla każdego przycisku tworzę button i wstawiam do niego nazwę kategorii, oraz podłączam funkcję fetchującą z punktu 2.
  for (let i = 0; i < names.length; i++) {
    let navButton = document.createElement("button");
    let navTitle = document.createTextNode(names[i]);
    navButton.appendChild(navTitle);

    //logika po wciśnięciu przycisku: w pierwszej kolejności pobieram dane z aktualnej strony oraz kategorii
    navButton.addEventListener("click", async () => {
      currentCategory = names[i];
      const fetchedData = await getData(names[i], currentPage);

      //zeruję wiersz tytułowy i paginację żeby w razie zmiany kategorii być na 1 stronie;
      headerAdded = false;
      currentPage = 1;
      startingIndex = 1;

      //renderuję tabelę
      printChart(fetchedData, names[i]);

      //tutaj dodaję listenery do detailsów i delete, ponieważ to funkcja asynchroniczna. Upewniam się że przyciski na których chcę dodać listenery już istnieją
      let detailsButtons = document.querySelector(".wrapper");

      detailsButtons.addEventListener('click', function (event) {
				if (event.target.matches('.details')) {
					detailsLogic(event.target)
				}
				if (event.target.matches('.delete')) {
					deleteLogic(event)
				}
			})
		})
    buttons.appendChild(navButton);
  }
};

generateButtons();

// stwarzam tutaj klasy z punktu f)
class Person {
  constructor({ name, birth_year, gender, height, created }, index) {
    this.index = index;
    this.name = name;
    this.birth_year = birth_year;
    this.gender = gender;
    this.height = height;
    this.created = created;
  }
  //i od razu w nich tworzę metodę która zmienia wartości z klasy od razu w html z jej wartościami
  toHTML() {
    return `<tr id="rowPeople${this.index}">
    <td class="td">${this.index}</td>
    <td>${this.name}</td>
    <td> ${this.birth_year}</td>
    <td>${this.gender}</td>
    <td> ${this.height}</td>
    <td>${new Date(this.created).toLocaleDateString()}</td>
    <td><button class="details people ${
      this.index
    }">details</button><button class="delete people ${
      this.index
    }">delete</button></td>
    </tr>`;
  }
}
class Planet {
  constructor({ name, climate, diameter, gravity, created }, index) {
    this.index = index;
    this.name = name;
    this.climate = climate;
    this.diameter = diameter;
    this.gravity = gravity;
    this.created = created;
  }
  toHTML() {
    return `<tr class="row planet">
    <td class="td">${this.index}</td>
    <td>${this.name}</td>
    <td> ${this.climate}</td>
    <td>${this.diameter}</td>
    <td> ${this.gravity}</td>
    <td>${new Date(this.created).toLocaleDateString()}</td>
    <td><button class="details planet index${
      this.index
    }">details</button><button class="delete planet index${
      this.index
    }">delete</button></td>
    </tr>`;
  }
}
class Film {
  constructor({ title, director, producer, release_date, created }, index) {
    this.index = index;
    this.title = title;
    this.director = director;
    this.producer = producer;
    this.release_date = release_date;
    this.created = created;
  }
  toHTML() {
    return `<tr class="row film">
    <td class="td">${this.index}</td>
    <td>${this.title}</td>
    <td> ${this.director}</td>
    <td>${this.producer}</td>
    <td> ${this.release_date}</td>
    <td>${new Date(this.created).toLocaleDateString()}</td>
    <td><button class="details films ${
      this.index
    }">details</button><button class="delete films${
      this.index
    }">delete</button></td>
    </tr>`;
  }
}
class Species {
  constructor(
    { name, language, average_height, average_lifespan, created },
    index
  ) {
    this.index = index;
    this.name = name;
    this.language = language;
    this.average_height = average_height;
    this.average_lifespan = average_lifespan;
    this.created = created;
  }
  toHTML() {
    return `<tr class="row species">
    <td class="td">${this.index}</td>
    <td>${this.name}</td>
    <td> ${this.language}</td>
    <td>${this.average_height}</td>
    <td> ${this.average_lifespan}</td>
    <td>${new Date(this.created).toLocaleDateString()}</td>
    <td><button class="details species ${
      this.index
    }">details</button><button class="delete species ${
      this.index
    }">delete</button></td>
    </tr>`;
  }
}
class Vehicle {
  constructor({ name, manufacturer, length, cost_in_credits, created }, index) {
    this.index = index;
    this.name = name;
    this.manufacturer = manufacturer;
    this.length = length;
    this.cost_in_credits = cost_in_credits;
    this.created = created;
  }
  toHTML() {
    return `<tr class="row vehicle">
    <td class="td">${this.index}</td>
    <td>${this.name}</td>
    <td> ${this.manufacturer}</td>
    <td>${this.length}</td>
    <td> ${this.cost_in_credits}</td>
    <td>${new Date(this.created).toLocaleDateString()}</td>
    <td><button class="details vehicle ${
      this.index
    }">details</button><button class="delete vehicle ${
      this.index
    }">delete</button></td>
    </tr>`;
  }
}
class Starship {
  constructor({ name, manufacturer, model, cost_in_credits, created }, index) {
    this.index = index;
    this.name = name;
    this.manufacturer = manufacturer;
    this.model = model;
    this.cost_in_credits = cost_in_credits;
    this.created = created;
  }
  toHTML() {
    return `<tr class="row starship">
    <td class="td">${this.index}</td>
    <td>${this.name}</td>
    <td> ${this.manufacturer}</td>
    <td>${this.model}</td>
    <td> ${this.cost_in_credits}</td>
    <td>${new Date(this.created).toLocaleDateString()}</td>
    <td><button class="details starships ${
      this.index
    }">details</button><button class="delete starships ${
      this.index
    }">delete</button></td>
    </tr>`;
  }
}

//to jest funkcja która wprowadza do opisanych wyżej klas wszystkie dane. Jest wywołana w pętli. Każda iteracja tworzy jeden wiersz w tabeli
const fillCategoryWithData = (index, val, category) => {
  let html = "";

  //ta część odpowiada za dodanie pierwszego wiersza z tytułami kolumn. Switch sprawdza którą kategorię wybrałem i czy wiersz nie był dodany wcześniej
  const addHeader = (flag) => {
    if (!flag) {
      switch (true) {
        case category === "people":
          html += `<tr>
                    <th>id</th>
                    <th>name</th>
                    <th>birth</th>
                    <th>gender</th>
                    <th>height</th>
                    <th>created</th>
                    <tr>`;
          break;
        case category === "planets":
          html += `<tr>
                    <th>id</th>
                    <th>name</th>
                    <th>climate</th>
                    <th>diameter</th>
                    <th>gravity</th>
                    <th>created</th>
                    <tr>`;
          break;
        case category === "films":
          html += `<tr>
                    <th>id</th>
                    <th>title</th>
                    <th>director</th>
                    <th>producer</th>
                    <th>release</th>
                    <th>created</th>
                    <tr>`;
          break;
        case category === "species":
          html += `<tr>
                    <th>id</th>
                    <th>name</th>
                    <th>language</th>
                    <th>height</th>
                    <th>lifespan</th>
                    <th>created</th>
                    <tr>`;
          break;
        case category === "vehicles":
          html += `<tr>
                    <th>id</th>
                    <th>name</th>
                    <th>manufacturer</th>
                    <th>length</th>
                    <th>cost</th>
                    <th>created</th>
                    <tr>`;
          break;
        case category === "starships":
          html += `<tr>
                    <th>id</th>
                    <th>name</th>
                    <th>manufacturer</th>
                    <th>model</th>
                    <th>cost</th>
                    <th>created</th>
                    <tr>`;
          break;
      }
    }
    //po dodaniu ustawiam flagę na true, żeby nie dodać wiersza tytułowego ponownie
    headerAdded = true;
  };

  //ten switch sprawdza kategorię żeby wybrać klasę i wstrzyknąć do niej wartości z fetcha
  switch (true) {
    case category === "people":
      const person = new Person(val, index);
      addHeader(headerAdded);
      return (html += person.toHTML());
    case category === "planets":
      const planet = new Planet(val, index);
      addHeader(headerAdded);
      return (html += planet.toHTML());
    case category === "films":
      const film = new Film(val, index);
      addHeader(headerAdded);
      return (html += film.toHTML());
    case category === "species":
      const species = new Species(val, index);
      addHeader(headerAdded);
      return (html += species.toHTML());
    case category === "vehicles":
      const vehicle = new Vehicle(val, index);
      addHeader(headerAdded);
      return (html += vehicle.toHTML());
    case category === "starships":
      const starship = new Starship(val, index);
      addHeader(headerAdded);
      return (html += starship.toHTML());
  }
};

// ta funkcja odpala pętlę i renderuje tabelę
const printChart = (val, category) => {
  

  const chart_container = document.getElementById("chart_container");

  //czyszczę tabelę po każdym odpaleniu funkcji żeby zrobić miejsce na nową zawartość:
  chart_container.innerHTML = "";

  //tworzenie nowej tablicy za pomocą pętli:
  let html = "";

  val.forEach((element, index) => {
    html += fillCategoryWithData(
      (index = index + startingIndex),
      element,
      category
    );
  });

  chart_container.innerHTML = html;

  //tutaj dodaję paginację i przyciski:

  //prev
  let prevButton = document.createElement("button");
  let prevText = document.createTextNode("PREV");
  prevButton.appendChild(prevText);
  chart_container.appendChild(prevButton);

  //next
  let nextButton = document.createElement("button");
  let nextText = document.createTextNode("NEXT");
  nextButton.appendChild(nextText);
  chart_container.appendChild(nextButton);

  //informacja o stronie
  let pagination = document.createElement("p");
  chart_container.appendChild(pagination);
  let quantityOfElements = document.createElement("p");
  chart_container.appendChild(quantityOfElements);

  let selectElements = document.createElement("select");
  selectElements.id = "elements";
  selectElements.innerHTML = `
    <option value="10" ${elementsPerPage === 10 ? "selected" : ""}>10</option>
    <option value="20" ${elementsPerPage === 20 ? "selected" : ""}>20</option>
    <option value="30" ${elementsPerPage === 30 ? "selected" : ""}>30</option>
  `;
  chart_container.appendChild(selectElements);

  // logika do zmiany liczby wyświetlanych elementów
  selectElements.addEventListener("change", async (event) => {
    elementsPerPage = parseInt(event.target.value);
    currentPage = 1;
    startingIndex = 0;
    const fetchedData = await getData(currentCategory, currentPage);
    headerAdded = false;
    printChart(fetchedData, currentCategory);
  });

  //odświeżanie sprawdzające czy to pierwsza strona żeby wyłączyć przycisk prev
  const refreshPagination = () => {
    if (currentPage <= 1) {
      prevButton.disabled = true;
    } else prevButton.disabled = false;
  };
  refreshPagination();
  pagination.innerHTML = `<p>Aktualna strona to: ${currentPage}</p>`;
  quantityOfElements.innerHTML = `<p> ilość elementów na stronie</p>`;

  chart_container.appendChild(selectElements);

  //logika next - dodaje stronę, ustala indexy na liście, ponownie pobiera dane z Backendu zgodne z wybraną stroną
  nextButton.addEventListener("click", async () => {
    currentPage++;
    startingIndex += elementsPerPage;
    refreshPagination();
    const fetchedData = await getData(currentCategory, currentPage);
    headerAdded = false;
    printChart(fetchedData, currentCategory);
  });


  //logika prev, jw. - odejmuje stronę, ustala indexy na liście, ponownie pobiera dane z Backendu zgodne z wybraną stroną
  prevButton.addEventListener("click", async () => {
    currentPage--;
    startingIndex -= 10;
    refreshPagination();
    const fetchedData = await getData(currentCategory, currentPage);
    headerAdded = false;
    printChart(fetchedData, currentCategory);
  });
  let pageInput = document.createElement("input");
  pageInput.type = "number";
  pageInput.min = "1";
  chart_container.appendChild(pageInput);
  
  // Dodaj etykietę dla pola tekstowego
  let pageInputLabel = document.createElement("label");
  pageInputLabel.innerHTML = "Przejdź do strony:";
  pageInputLabel.htmlFor = "page-input";
  chart_container.insertBefore(pageInputLabel, pageInput);
  
  // Dodaj przycisk "Przejdź" i obsługę zdarzenia kliknięcia
  let goToButton = document.createElement("button");
  let goToText = document.createTextNode("Przejdź");
  goToButton.appendChild(goToText);
  chart_container.appendChild(goToButton);
  
  goToButton.addEventListener("click", async () => {
    // Pobierz numer strony z pola tekstowego
    let page = parseInt(pageInput.value);
    console.log("PAGE",page)
 
    console.log("currentPage",currentPage)
    console.log("startingIndex",startingIndex)

  
    // Sprawdź, czy wprowadzona wartość jest poprawna
    if (!isNaN(page) && page >= 1 && page < 10) {
      currentPage = page;
      startingIndex = (currentPage - 1) * elementsPerPage;
      refreshPagination();
      const fetchedData = await getData(currentCategory, currentPage);
      headerAdded = false;
      printChart(fetchedData, currentCategory);
    }
  })

  selectElements.addEventListener("change", async () => {
    elementsPerPage = parseInt(selectElements.value);
    console.log(selectElements,"selectElements")
    console.log(elementsPerPage)
    currentPage = 1;
    startingIndex = 0;
    const fetchedData = await getData(currentCategory, currentPage);
    headerAdded = false;
    printChart(fetchedData, currentCategory);
  });
}


//Details & Delete

const deleteLogic = element => {
	createDeleteModal(element)
}

const detailsLogic = (element) => {
  createDetailsModal(element)
  
};












const modal = (body = {}) => {
  return `<div tabindex="10" class="modal">
    <p class='modal-title ${body.type || ""}'>
      <i class="modal-title-icon" data-feather="${
        body.modal_icon || "info"
      }"></i>
      ${body.title || "Are you sure?"}
    </p>
    <div class="modal-buttons">
      <button class="modal-accept modal-action-btn">${
        body.accept_btn || "Yes"
      }</button>
      <button class="modal-decline modal-action-btn">${
        body.decline_btn || "No"
      }</button>
    </div>
    <button class="modal-close-icon"><i data-feather="x"></i></button>
  </div>`;
};

const modalDetails = (body = {}) => {
  return `<div tabindex="10" class="modal">
    <p class='modal-title ${body.type || ""}'>
      <i class="modal-title-icon" data-feather="${
        body.modal_icon || "info"}"></i>
      ${body.title || "DETAILSY"}
    </p> <div class="modal-buttons">
  </div>
  <button class="modal-close-icon-details"><i data-feather="x"></i></button>
</div>`;
};





const createDetailsModal = (value) => {
  const generateDetails = async () => {
    const category = value.className.split(" ")[1];
    const page = value.className.split(" ")[2];
    const data = await getDataToDetails(category, page);
    return data;
  };
  
  const getDataToDetails = async (category, page) => {
    const response = await fetch(`https://swapi.dev/api/${category}/${page}`);
    const data = await response.json();
    if (Array.isArray(data)) {
      return data;
    } else {
      return [data];
    }
  };
  
  const modalContainer = document.createElement("div");
  modalContainer.className = "modal-container";
  modalContainer.innerHTML = modalDetails(value);
  document.body.appendChild(modalContainer);
  
  const moreDetails = document.createElement("p");
  moreDetails.className = "more-details";
  
  generateDetails().then((data) => {
    const keyValueArray = data.map((obj) => {
      return Object.entries(obj).map(([key, value]) => {
        return `${key}: ${value}`;
      });
    });
    const keyValueStringArray = keyValueArray.join(", ");
    moreDetails.innerHTML = keyValueStringArray;
  }).catch((error) => {
    console.log(error);
  });
  
  const insideDiv = document.querySelector(".modal-buttons");
  insideDiv.appendChild(moreDetails);

  const closeIcon = document.querySelector(".modal-close-icon-details");
  closeIcon.addEventListener("click", () => {
    const modal = document.querySelector(".modal-container");
    modal.remove();
    document.body.style.overflow = "hidden";
  });

  const modalActive = document.querySelector(".modal");
  modalActive.focus();
  modalActive.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const modal = document.querySelector(".modal-container");
      modal.remove();
      document.body.style.overflow = "auto";
    }
  });

  const modalActiveContainer = document.querySelector(".modal-container");
  modalActiveContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-container")) {
      e.target.remove();
    }
  });

  feather.replace();
  document.body.overflow = "hidden";
};





const createDeleteModal = (value) => {
  const modalContainer = document.createElement("div");
  modalContainer.className = "modal-container";
  modalContainer.innerHTML = modal(value);
  document.body.appendChild(modalContainer);

  const closeIcon = document.querySelector(".modal-close-icon");

  closeIcon.addEventListener("click", () => {
    const modal = document.querySelector(".modal-container");
    modal.remove();
    document.body.style.overflow = "hidden";
    
  });

  const closeButton = document.querySelector(".modal-accept")
  closeButton.addEventListener('click', e => {
		const modal = document.querySelector('.modal-container')
		modal.remove()

		document.body.style.overflow = 'auto'
		value.srcElement.parentElement.parentElement.remove()
	})

    const closeButtonTwo = document.querySelector(".modal-decline");
  closeButtonTwo.addEventListener("click", () => {
      const modal = document.querySelector(".modal-container");
      modal.remove();
      document.body.style.overflow = "auto";
    })
    
  const modalActive = document.querySelector(".modal");
  modalActive.focus();
  modalActive.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const modal = document.querySelector(".modal-container");
      modal.remove();
      document.body.style.overflow = "auto";
    }})

  const modalActiveContainer = document.querySelector(".modal-container");

  modalActiveContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-container")) {
      e.target.remove();
    }
  });
  feather.replace();
  document.body.overflow = "hidden";
};







