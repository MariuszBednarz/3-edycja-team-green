let api;

async function loadCollection(collection) {
  const response = await fetch(collection);
  const rawData = await response.json();
}

async function getData() {
  const response = await fetch("https://swapi.dev/api/");
  const data = await response.json();
  let btn;
  api = data;
  for (item in data) {
    btn = document.createElement("button");
    btn.innerHTML = item;
    document.body.appendChild(btn);
    btn.addEventListener("click", () => {});
  }
}

getApi();
