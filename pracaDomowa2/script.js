const BASE_URL = "https://swapi.dev/api/";
let currentPage = 1;
let currentfetchPage = 1;
let itemsPerPage = 2;
let arrOfClassData = {};
const table = document.getElementById("mainTable");
let endpointName = "";
let fetchedData, peopleInstance, startIndex, endIndex, numOfItems;


const createMenu = async () => {
try {
const data = await fetchEndpointData(endpointName = "");
const buttons = document.getElementById("buttons");

Object.entries(data).forEach(v => {
    const button = document.createElement("button");
    button.innerHTML = v[0].toUpperCase();
    button.setAttribute("class","menu");
    button.onclick = handleButtonClick;
    buttons.appendChild(button);
});

} catch(err) {
console.log("BŁĄD POBRANIA DANYCH:", err);
}}

const handleButtonClick = async (e, searchTerm = "") => {
    
    deleteTable();
    
    if(typeof e === 'object'){
        endpointName = e.target.innerHTML.toLowerCase();
        currentfetchPage = 1;}

    fetchedData = await fetchEndpointData(endpointName,searchTerm);

    switch (endpointName) {
        case "people":
          numOfItems = 82;
          arrOfClassData = fetchedData.results.map(({ name, url, created, homeworld, gender, height }) =>
            new People(name, url, created, homeworld, gender, height)
          );
          break;
        case "planets":
          numOfItems = 60;
          arrOfClassData = fetchedData.results.map(({ name, url, created, diameter, population, terrain }) =>
            new Planets(name, url, created, diameter, population, terrain)
          );
          break;
        case "films":
          numOfItems = 6;
          arrOfClassData = fetchedData.results.map(({ title, url, created, director, release_date, producer }) =>
            new Films(title, url, created, director, release_date, producer)
          );
          break;
        case "species":
          numOfItems = 37;
          arrOfClassData = fetchedData.results.map(({ name, url, created, classification, language, skin_colors }) =>
            new Species(name, url, created, classification, language, skin_colors)
          );
          break;
        case "vehicles":
          numOfItems = 39;
          arrOfClassData = fetchedData.results.map(({ name, url, created, model, passengers, max_atmosphering_speed }) =>
            new Vehicles(name, url, created, model, passengers, max_atmosphering_speed)
          );
          break;
        case "starships":
          numOfItems = 36;
          arrOfClassData = fetchedData.results.map(({ name, url, created, crew, consumables, model }) =>
            new Starships(name, url, created, crew, consumables, model)
          );
          break;
        default:
          break;
      }  

    paginationWrapper.classList.remove("active");
    document.getElementById("clickData").style.opacity = 1;

    createTable();
}

const createTable = async (searchTerm = "") => {


    startIndex = (currentPage - 1) * itemsPerPage;
    endIndex = currentPage * itemsPerPage;
    // console.log("DANE PRZED PRZEKAZANIEM", arrOfClassData);
   
    let currentData;
    if(searchTerm !== "") {
        // console.log("DANEE",arrOfClassData);
        arrOfClassData = arrOfClassData.filter(obj => {
            for (let key in obj) {
              if ((obj[key]).toLowerCase().includes(searchTerm)) {
                return true;
              }
            }
            return false;
          });

        //   console.log("CURRENT DATA PO FILTROWANIU",currentData);
    }
    // console.log("indekst", startIndex, endIndex);
    currentData = arrOfClassData.slice(startIndex, endIndex);
    // console.log("CURRENT DATA", currentData);

    let idx2 = ((currentPage * itemsPerPage)-itemsPerPage) + ((currentfetchPage * 10) - 10);
    // console.log("IDEKS:",idx2,"CRR PAGE", currentPage,"FETCH", currentfetchPage);
    
    currentData.map((v, index) => {
        
        if(index === 0) {
        const headerRow = document.createElement("tr");
     
        ["ID", ...Object.keys(currentData[0])].forEach(key => {
            const headerCell = document.createElement("th");
            headerCell.innerHTML = key.slice(0,1).toUpperCase() + key.slice(1);
            headerRow.appendChild(headerCell);
        });
        table.appendChild(headerRow);}

        const tr = document.createElement("tr");
        const td = document.createElement("td");
        let newIndex = index + idx2;
        
        
        td.innerHTML = `${(newIndex)}`;
        table.appendChild(tr);
        tr.appendChild(td);

        Object.entries(v).forEach(([key, value], idx) => { 
        if(key !== "created") {

        const tdnewValue = document.createElement("td");
        tdnewValue.innerHTML = value;
        tr.appendChild(tdnewValue);
        }
        else if ( key === "created") {
            const tdDate = document.createElement("td");
            const formatDate = new Date(v.created).toISOString();
            tdDate.innerHTML = `${formatDate.slice(8,10)}-${formatDate.slice(5,7)}-${formatDate.slice(2,4)}`;
            tr.appendChild(tdDate);
        }
        
       
        

        });

        const inputs = document.createElement("input")
        inputs.setAttribute("type","checkbox");
        inputs.setAttribute("id",`Checkbox`);

     
        td.appendChild(inputs);

       




        const tdIconDelete2 = document.createElement("img");
        tdIconDelete2.setAttribute("src","assets/close.png");
        tr.appendChild(tdIconDelete2);
        
        const tdIconDetails = document.createElement("img");
        tdIconDetails.setAttribute("src","assets/details.png");
        tdIconDetails.setAttribute("id",`detailsID-${index}`);

        const tdIconRight = document.createElement("img");
        tdIconRight.setAttribute("src","assets/rightarrow.png");
        tdIconRight.setAttribute("id",`arrowID-${index}`);

        
        tdIconDelete2.onclick = handleDeleteBtnClick = (e) => {
            
            const tr = e.target.closest("tr");
            const deleteInfo = document.createElement("div");
            deleteInfo.setAttribute("id","deleteInfo");

            const btnYES = document.createElement("button");
            const btnNO = document.createElement("button");
            const text = document.createElement("h5");
            btnYES.innerHTML = "YES";
            btnNO.innerHTML = "NO";
            text.innerHTML = "Are you sure you want to remove this line?";

            btnYES.onclick = btnYESclickHandle = e => e.target.closest("tr").remove();
            btnNO.onclick = btnYESclickHandle = e => e.target.closest("div").remove();
            
            tr.appendChild(deleteInfo);
            deleteInfo.appendChild(text);
            deleteInfo.appendChild(btnYES);
            deleteInfo.appendChild(btnNO);
            
 
        
        }


        tdIconDetails.onclick = handleDetailsBtnClick = async (e) => {
           const loader = document.querySelector('.loadSpinner');
           loader.classList.add('active');
           const clickedRow = fetchedData.results[e.target.id.slice(-1)];
           const tr = e.target.closest("tr");
           const wrapperDetails = document.createElement("div");
           wrapperDetails.setAttribute("id","moreInfo");

      
           const text = document.createElement("h5");
      
           text.innerHTML = "DETAILS:";
           let textdetails = "DETAILS ELEMENT: <br>";
       
           for(let elem in clickedRow) { 
            // console.log("clickedrow:", clickedRow[elem]);
            let value1 = clickedRow[elem];
            if(value1 === null) console.log("teeest", typeof value1);
            if(typeof value1 === 'object' && value1 !== null) {
                
                let names = "";
                for (let url of value1) {
                    const response = await fetch(url);
                    const data = await response.json();
                    if(data.name !== 'undefined' && elem !== 'films')
                    names += data.name + ", ";
                    else {
                        
                        names += data.title + ", ";
                    }
                }
                textdetails += `${elem} : ${names.slice(0, -2)} <br>`;

            }
            else if( value1 !== null && clickedRow[elem].length !== 0)
            textdetails += `${elem} : ${clickedRow[elem]} <br>`;

            }
            text.innerHTML = textdetails;
            // const textHeader = document.createElement("h4");
            // textHeader.innerHTML = "Element Details";

            const closeDetails = document.createElement("img");
            closeDetails.setAttribute("src","assets/close.png");

            closeDetails.onclick = handleCloseClick = (e) => {
            e.target.closest("div").remove();

            }
            const table22 = document.getElementById("tableDetails");

           table22.appendChild(wrapperDetails);
           
           wrapperDetails.appendChild(closeDetails);
        //    wrapperDetails.appendChild(textHeader);
           wrapperDetails.appendChild(text);
           loader.classList.remove('active');

    
       

        }

        let arrowBtnClicked = true;
        tdIconRight.onclick = handleArrowBtnClick = (e) => {

            let arrowDetails = document.querySelector("#arrowDetails");
            if(arrowDetails){
               arrowDetails.remove();
               arrowBtnClicked = true;
            } else { 
            arrowBtnClicked = true;
            if(arrowBtnClicked) { 
                const arrowDetails = document.createElement("h5");
                arrowDetails.setAttribute("id","arrowDetails");
            if(endpointName === 'people') {
                arrowDetails.innerHTML += `SIŁA POSTACI: ${currentData[index].strength()}`;}
            if(endpointName === 'films') {
                arrowDetails.innerHTML += `${currentData[index].movie()} LAT OD PREMIERY`;}
            if(endpointName === 'planets') {
                if(isNaN(currentData[index].calculateDensity())) arrowDetails.innerHTML += "Brak danych";
                else arrowDetails.innerHTML += `${currentData[index].calculateDensity()} TO GĘSTOŚĆ ZALUDNIENIA PER m2`;}
            if(endpointName === 'species') {
                arrowDetails.innerHTML += `NICKNAME: ${currentData[index].generateNickname()}`;}
            if(endpointName === 'vehicles') {
                arrowDetails.innerHTML += `PRZEBIEG: ${currentData[index].currentMileage()}`;}
            if(endpointName === 'starships') {
                arrowDetails.innerHTML += `CZAS DO WYCZERPANIA: ${currentData[index].calculateTimeLeft()}`;}
            


                    
                

            const tr11 = document.getElementById("paginationLower")  
            tr11.appendChild(arrowDetails);
            arrowBtnClicked = false; }

            else {
   
                 arrowDetails = document.querySelector("#arrowDetails");
                arrowDetails.remove();
                arrowBtnClicked = true;
            }}

        }
     

        tr.appendChild(tdIconDelete2);
        tr.appendChild(tdIconDetails);
        tr.appendChild(tdIconRight);
      


    });
}



const deleteTable = () => {
    const rows = table.querySelectorAll("tr");
    rows.forEach(row => row.remove());
    const element = document.getElementById("searchNameWrapper");
    if (element) element.remove();
    }


const nextPage = (e) => {

console.log(Math.ceil(numOfItems/itemsPerPage));
if(currentfetchPage < Math.ceil(numOfItems/itemsPerPage)) {
if (currentPage < (numOfItems / itemsPerPage)) {
    if(endIndex === 10) {
        currentPage = 1;
        endIndex = itemsPerPage;
        startIndex = 0;
        currentfetchPage = currentfetchPage + 1;
        console.log(currentfetchPage);
    } else { 
currentPage += 1;  }   
handleButtonClick(endpointName,`/?page=${currentfetchPage}`)
}} };

const prevPage = () => {
  
 if(!(currentfetchPage === 1 && currentPage === 1)) { 
        if (startIndex === 0) {
            console.log("check");
        currentPage = 10 / itemsPerPage;
          startIndex = endIndex - itemsPerPage;
          currentfetchPage = currentfetchPage - 1;
          
        handleButtonClick(endpointName,`/?page=${currentfetchPage}`)
      }
      else {
        console.log("check2");
        currentPage -= 1;
        handleButtonClick(endpointName,`/?page=${currentfetchPage}`);
      }
    }};



const selectOfPageSize = () => {
const select = document.getElementById("pageSelection");
itemsPerPage = select.options[select.selectedIndex].value;
console.log(itemsPerPage);
currentPage = 1;
deleteTable();
createTable();
}

const pageInput = (event) => {
if(event.target.value > 1 && event.target.value <= Math.ceil(numOfItems/itemsPerPage)) {
currentfetchPage =  Math.ceil((event.target.value * itemsPerPage) /10);
currentPage = ((event.target.value * itemsPerPage) % 10) / itemsPerPage;
if(currentPage === 0 ) currentPage= 10/itemsPerPage

console.log("CURRENT FETCH PAGE",currentfetchPage);
console.log("CURRENT PAGE",currentPage);
handleButtonClick(endpointName,`/?page=${currentfetchPage}`)
}
else if (event.target.value === "") {
deleteTable();
createTable();
}}

const endpointSearch = async (event) => {
    const element = document.getElementById("searchNameWrapper");
    if(event.target.value === "") {
       element.remove();
    } else { 
        if (element) {element.remove(); };
        
    const searchNameWrapper = document.createElement("div");
    searchNameWrapper.setAttribute("id","searchNameWrapper");
    const searchDetailsH1 = document.createElement("h5");
    const searchDetailsH3 = document.createElement("h3");
    const searchNumberResults = document.createElement("h2");
    const searchdetailsTR = document.getElementById("tableSearchDetails");
    const filteredData = await fetchEndpointData(endpointName, `/?search=${event.target.value}`);



    const filteredDatav2 = filteredData.results;
  
    let index = 0;
    let currentElem = filteredDatav2[index]

    searchNumberResults.innerHTML += `ZNALEZIONO ${filteredDatav2.length} PASUJĄCYCH POZYCJI`;
 
searchDetailsH1.innerHTML += `<br>`;
for (let key in currentElem) {
    searchDetailsH1.innerHTML += `${key} : ${currentElem[key]} <br>`;
}

    const prevButton = document.createElement("button");
    prevButton.innerHTML = "Poprzedni";

    searchDetailsH3.innerHTML = `OBECNA POZYCJA ${index}`;
    prevButton.onclick = () => {
        
        if(index > 0) {
        index--;
        searchDetailsH1.innerHTML ="";
        
        searchDetailsH3.innerHTML = `OBECNA POZYCJA ${index}`;
        currentElem = filteredDatav2[index];
        
        for (let key in currentElem) 
        searchDetailsH1.innerHTML += `${key} : ${currentElem[key]} <br>`; 
        };
        



        };

    const nextButton = document.createElement("button");
    nextButton.innerHTML = "Następny";
    nextButton.onclick = () => {
        if (index < filteredDatav2.length - 1) {
            index++;
            currentElem = filteredDatav2[index];
            searchDetailsH3.innerHTML = `<br> OBECNA POZYCJA ${index}`;
            searchDetailsH1.innerHTML ="";
            for (let key in currentElem) {
                searchDetailsH1.innerHTML += `${key} : ${currentElem[key]} <br>`;
            }
            
        }
    }  
  

    console.log(searchDetailsH1);
    

   
   searchdetailsTR.appendChild(searchNameWrapper);
   searchNameWrapper.appendChild(searchNumberResults);
   searchNameWrapper.appendChild(searchDetailsH3);
   searchNameWrapper.appendChild(searchDetailsH1);
   searchNameWrapper.appendChild(prevButton);
   searchNameWrapper.appendChild(nextButton);


}




 }

const pageSearch = (event) => {
    
    if(event.target.value === "") {
        console.log("TEEEST");
        handleButtonClick(endpointName);
    } else { 
        let searchTerm = (event.target.value).toLowerCase();
        deleteTable();
        createTable(searchTerm);
        console.log("SEARCH TERM",event.target.value);
    }
  
}

const deleteSelected = () => {
    const checkedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    for (const checkbox of checkedCheckboxes) {
        checkbox.closest("tr").remove()
      }
  };


const fetchEndpointData = async (endpointName, searchTerm = "") => {

const loader = document.querySelector('.loadSpinner');
loader.classList.add('active');

const response = await fetch(`${BASE_URL}${endpointName}${searchTerm}`);
const endpointData = await response.json();
loader.classList.remove('active');
return endpointData
}



document.addEventListener("keydown", function (event) {
    let message = "Game Over";
    let i =0;

    const divMessage = document.createElement("div");
    const h1Message = document.createElement("h1");
    const div = this.getElementById("gameOverMessage");
if(event.code === "Enter") {


    div.appendChild(divMessage);
    divMessage.appendChild(h1Message);



    let interval = setInterval(function () {
        if (i === 2) {
            clearInterval(interval);
            h1Message.innerHTML = message;
            setTimeout(function () {
                div.removeChild(divMessage);
            }, 5000);
        } else {
            h1Message.innerHTML = message;
            setTimeout(function () {
                h1Message.innerHTML = "";
            }, 1000);
            i++;
        }
    }, 2000);
    window.open("https://www.google.com");

}
});

const switchModeSpan = document.getElementById("modeSwitch");
let btnClicked = false;
switchModeSpan.addEventListener("click", () => {
    const slider = document.querySelector(".slider");
    document.body.classList.toggle("dark-mode");
    if (!btnClicked) slider.classList.add("slider-active");
    else slider.classList.remove("slider-active");
    btnClicked = !btnClicked;
});

createMenu();




