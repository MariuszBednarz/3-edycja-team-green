//  1. Napisz funkcję mapującą, która utworzy klucz(właściwość) nickname na każdej osobie w tablicy w następujący sposób:
// a) pobierze 3 pierwsze litery imienia, odwróci ich kolejność i zapisze do zmiennej
// b) pobierze 3 ostatnie litery nazwiska, zamieni kolejnością pierwszą i ostatnią i dołączy powstały string poprzedniego
// c*) Zmieni wielkość liter w taki sposób, żeby powstały nick zaczynał się wielką literą i nie miał żadnywielkich liter poza 1.
// d) Jeżeli liczba znaków w imieniu bądź nazwisku jest mniejsza niż 3, nickname będzie odpowiednio krótszy 
// e) rozważcie wszystkie skrajne przypadki, ponieważ Waszą funkcję mapującą wrzucimy do testów na platformie*/
// ************************************************************************************

let people = [
  {
    firstName: "Bartolomeo",
    lastName: "Lozano",
  },
  {
    firstName: "Mateo",
    lastName: "Loza",
  },
  {
    firstName: "Barwerk",
    lastName: "Lozewrweano",
  },
  {
    firstName: "Bar",
    lastName: "Loz",
  },

];

people = people.map(function (person) {

  let firstSliceLength = 3;

  if (person.firstName.length < 3) firstSliceLength = 2;
  if (person.firstName.length < 2 && person.firstName.length >= 1) firstSliceLength = 1;
  if (person.firstName.length < 1) firstSliceLength = 0;

  //zmienna z małej litery :)
  let secondSliceLength = 3;
  if (person.lastName.length < 3) secondSliceLength = 2;
  if (person.lastName.length < 2 && person.lastName.length >= 1) secondSliceLength = 1;
  if (person.lastName.length < 1) secondSliceLength = 0;


  let nickname = person.firstName.toLowerCase().split("").slice(0, firstSliceLength).reverse().join("") +
    person.lastName.toLowerCase().slice(-secondSliceLength).split("").reverse().join("");
  nickname = nickname[0].toUpperCase() + nickname.slice(1);

  return {
    ...person,
    nickname
  }

});

console.log("ZADANIE 1 - DODANIE NICKNAMES =>", people);

// -----------------------------------------------------------------------------------------------------------------------------

// 2. a) Do każdego obiektu dodaj funkcję introduceYourself, która za pomocą słówka this wyświetli w konsoli tekst powitalny.

// Oczywiście tekst powinien wyświetlić się dopiero po wywołaniu funkcji.
// Dla powyższego przykładu tekst powinien wyglądać w następujący sposób:
// "Cześć jestem Bartolomeo Lozano, ale w szkole mówią na mnie [Rabona]"
// Natomiast wywołanie funkcji: people[0].introduceYourself()
// Obiekt z przykładu powinien wyglądać w ten sposób
// {
//     firstName: "Bartolomeo",
//     lastName: "Lozano",
//     nickname: "Rabona",
//     introduceYourself: // tutaj ma się znajdować funkcja
// },
// b) za pomocą pętli forEach, wywołaj funkcję powitalną dla każdego elementu tablicy. W rezultacie na ekranie powinien
// pojawić się tekst powitalny dla każdej osoby w tablicy
// Hints:
// - nie używaj w tym zadaniu funkcji strzałkowej, ponieważ słówko this Ci nie zadziała i nie będziesz miał(a)
// dostępu do this.firstName lastName i nickname
// - postaraj się zdefiniować funkcję powitalną tylko raz (nie rób tego w pętli, ani funkcji map)
// ************************************************************************************

function introduceYourself() {

  console.log(`Cześć jestem ${this.firstName} ${this.lastName}, ale w szkole mówią na mnie ${this.nickname}`);
}

people = people.map((person) => {
  return {
    ...person,
    introduceYourself
  }
});
console.log("ZADANIE 2 - DODANIE FUNKCJI =>");
people.forEach(function (person) { person.introduceYourself(); });

//-----------------------------------------------------------------------------------------------------------------------------


// 3.  a) Dodaj do każdego obiektu funkcję getFavouriteColor
// b) funkcja ma przyjmować jeden parametr typu number z zakresu 1 - 30
// c) jeżeli podany parametr jest poza zakresem, powinien wyświetlić się odpowiedni komunikat
//     - podałeś za małą liczbę, liczba nie może być mniejsza niż 1
//     - podałeś za dużą liczbę, liczba nie może być większa niż 30
// d) w przypadku wywołania funkcji bez parametru, powinniśmy ustawić domyślną wartość na 5
// e) funkcja powinna zsumować wszystkie litery imienia, nazwiska i przezwiska, 
// odjąć od tej sumy liczbę wprowadzoną w parametrze, a następnie za pomocą działania modulo (%) względem długości tablicy kolorów
// wyznaczyć index
// f) za pomocą indexu funkcja powinna wyciągnąć odpowiedni kolor z tablicy i wyświetlić go w konsoli.
// Dla powyższego przykładu i liczby 5 wprowadzonej w parametrze, powinniśmy uzyskać wynik:
// (22 - 5) % 6 = 5
// console.log("orange")
// Hints
// - jeżeli po odjęciu parametru funkcji od sumy liter uzyskacie wartośc ujemną, możecie użyć metody z biblioteki Math, 
// Math.abs(-20), która zamieni liczbę na wartość absolutną, czyli dodatnią
// - w funkcji musicie użyć słówka this, parametru i tablicy, która jest na zewnątrz, tablica z kolorami może mieć
// dowoloną ilość kolorów
// ************************************************************************************

const colors = ["red", "green", "yellow", "blue", "pink", "orange"];

function getFavouriteColor(number = 5) {
  if (number <= 1) console.log("podałeś za małą liczbę, liczba nie może być mniejsza niż 1");
  else if (number >= 30) console.log("podałeś za dużą liczbę, liczba nie może być większa niż 30")
  const index = Math.abs((this.firstName.length + this.lastName.length + this.nickname.length - number) % colors.length);

  return console.log(colors[index]);
};

people = people.map((person) => {
  return {
    ...person,
    introduceYourself,
    getFavouriteColor,

  }
})
console.log("ZADANIE 3 - DODANIE FUNKCJI KOLOR =>");
people.forEach(function (person) { return person.getFavouriteColor() });
console.log(people);
//-----------------------------------------------------------------------------------------------------------------------------

// 4. Napisz funkcję analogiczną do funkcji z zadania 3, ale nie dodawaj jej w obiekcie.
// a) funkcja powinna przyjąć 2 parametry (obiekt osoby i liczbę z zakresu 1 - 30)
// b) funkcja powinna wykonać dokładnie takie samo działanie jak poprzednia
// c) Za pomocą pętli for of przeiteruj po wszystkich osobach z tablicy i wyświetl ich ulubione kolory

// ************************************************************************************

// const people = [
//   {
//     firstName: "Bartolomeo",
//     lastName: "Lozano",
//     nickname: "Rabona",
//     introduceYourself: "", // funkcja zamiast pustego stringa
//   },
// ];

// const colors = ["red", "green", "yellow", "blue", "pink", "orange"];


function getFavouriteColorv2(person, num = 5) {

  if (num <= 1) console.log("podałeś za małą liczbę, liczba nie może być mniejsza niż 1");
  else if (num >= 30) console.log("podałeś za dużą liczbę, liczba nie może być większa niż 30");
  else {

    for (let item of person) {

      const index = Math.abs((item.firstName.length + item.lastName.length + item.nickname.length - num) % colors.length);
      console.log(colors[index]);
    }
  }

};
console.log("ZADANIE 4 - DODANIE FUNKCJI KOLOR V2 =>")
getFavouriteColorv2(people, num = 5);

//-----------------------------------------------------------------------------------------------------------------------------

// 5. Zadanie polega na użyciu .filter() .map() .reduce w wersji łańcuchowej,
// czyli nie twórz nowych tablic w momencie wykonanie jednej z powyższych metod, połącz wykonanie ze sobą w jeden 
// a) Przefiltruj tablicę w taki sposób, aby zostały w niej osoby,
// których imię kończy się na literę 'a' lub 'k' 
// i nazwisko ma więcej znaków niż 6 
// i nick zawiera w sobie przynajmniej jedną literę a
// b) do powyższego warunku dodaj "furtkę" w postaci parametru isElite. Zmienna isElite powinna być obliczona
// za pomocą generatora liczb pseudolosowych Math.random(). Za pomocą tego generatora wylosujcie liczbę z zakresu 0 - 100.
// Jeżeli wartość losowej liczby będzie liczbą pierwszą lub będzie podzielna przez 3 i 5, ustawcie isElite na true, w pozostałych przypadkach
// isElite powinno być ustawione na false
// c) jeżeli zmienna isElite ma wartość true, nie bierzcie pod uwagę warunku z punktu a przy filtracji
// d) za pomocą funkcji map i for in odwróccie wartości i klucze w obiekcie, usuwając przy tym funkcje
// Przykład
// INPUT
// {
//     firstName: "Bartolomeo",
//     lastName: "Lozano",
//     nickname: "Rabona",
//     introduceYourself: '' // funkcja zamiast pustego stringa
//     getFavouriteColor: '' // funkcja zamiast pustego stringa
// },
// OUTPUT
// {
//     Bartolomeo: "firstName",
//     Lozano: "lastName",
//     Rabona: "nickname",
// },
// e) zredukuj tablicę obiektów do pojedynczego obiektu, który będzie zawierał wszystkie klucze i wartości
// wszystkich obiektów z tablicy, dzięki temu, że w punkcie d) odwrócilismy klucze z wartościami, nie będzie 
// z tym problemu :)
// *f) odtwórz z obiektu tablicę, która będzie zawierała same nicknames i 
// nazwiska, ktdjest < s i
// imię, którego chociaż jedna litera jest większa >= s
// g) posortuj tablicę alfabetycznie

// ************************************************************************************

//  const people = [
//     {
//       firstName: "Bartolomea",
//       lastName: "Lozanof",
//       nickname: "Rabona",
//     },
//     {
//       firstName: "Barwerk",
//       lastName: "Lozewrweano",
//       nickname: "Rabonsa",
//     } 
//   ];

console.log("ZADANIE 5 =>")
let number = Math.round(Math.random() * 100);
let isElite = true;
let checkPrime = true;
//Check if number is Prime
for (let i = 2; i < number; i++) {
  if (number % i == 0) {
    checkPrime = false;
    break;
  }
}
//Setting isElite value  
if (number % 3 === 0 && number % 2 === 0) isElite = true;
if (number <= 1) isElite = false;
else if (!checkPrime) isElite = false;


const result = people.filter((person) => {

  if (isElite === true) {
    if (
      person.lastName.length > 6 &&
      person.nickname.toLowerCase().includes('a')) { return true; }
    { return false }
  } else {
    //można użyć też metody endsWith();
    if (['a', 'k'].includes(person.firstName.slice(-1)) &&
      person.lastName.length > 6 &&
      person.nickname.toLowerCase().includes('a')) { return true; }
    { return false }
  }

})
  .map((person) => {
    const swapped = {};
    for (key in person) {
      if (("getFavouriteColor") !== key && ("introduceYourself") !== key)
        swapped[person[key]] = key;
    }
    return swapped;
  })
  .reduce((acc, val) => {
    for (key in val) {
      acc[key] = val[key];
    }
    return acc;
  }, {});

console.log(result);


let newResult = [];


// PODPUNKT F => 
for (key in result) {
  if (['lastName', 'nickname'].includes(result[key])) { //  ZAWIERA NAZWISKA/NICKNAME GDZIE CHOCIAZ 1 LITERA JEST  < S
    for (let i = 0; i < key.length; i++) {

      if ((((key[i]).toLowerCase()).charCodeAt(0)) < 115) {
        break;
      }

    }
    newResult.push(key);
  };
  if (result[key] == 'firstName') { // IMIĘ, KTÓREGO CHOCIAZ JEDNA LITERA JEST WIĘKSZA OD S
    for (let i = 0; i < key.length; i++) {

      if ((((key[i]).toLowerCase()).charCodeAt(0)) >= 115) {

        newResult.push(key);
        break;
      }

    }


  }
};
newResult.sort();
console.log("result", newResult);


//-----------------------------------------------------------------------------------------------------------------------------


// 6. Currying function
//  a) Napisz taką funkcję mnożącą 2 liczby, aby możliwe były następujące wywołania:
//  - multi(5)(6)
//  - const multiplyBySix = sum(6)
//    multiplyBySix(10)
//  b) Analogicznie napisz funkcję, która mnoży 4 liczby i możliwe jest wywołanie
//  - multi(4)(5)(6)(10)
//  Hints:
//  - funkcja może zwracać inne funkcje
//  - funkcja może korzystać ze zmiennych i parametrów funkcji zewnętrznych (czyli tych w których się znajduje)

// ************************************************************************************

function multi(a) {
  return function (b) {
    return a * b;
  }
}
const multiplyBySix = multi(6);
console.log("ZADANIE 6 WERSJA 1 =>", multi(5)(6), multiplyBySix(10));
const multiv2 = (a) => {
  return (b) => {
    return (c) => {
      return (d) => {
        return a * b * c * d
      }
    }
  }
}

console.log("ZADANIE 6 WERSJA 2 =>", multiv2(4)(5)(6)(10))

//-----------------------------------------------------------------------------------------------------------------------------
// **7. Rekurencja
//        a) Mając zagnieżdżony obiekt, wyciągnij z niego wszystkie imiona i dodaj do tablicy
//        ***b) Jeżeli osoba ma więcej niż jedno imię, te imiona powinny znajdować się w jednym stringu w tablicy
//        Na przykład 'Kamil Bartek'

// ************************************************************************************



const nestedObject = {
  name: "Kamil",
  children: [
    {
      name: "Zosia",
    },
    {
      name: "Krysia",
      name2: "Barbara",
      children: [
        {
          name: "Basia",
          children: [
            {
              name: "Monika",
              name2: "Viola",
              children: [
                {
                  name: "Mateusz",
                },
                {
                  name: "Sebastian",
                  name2: "August",
                  name3: "Franciszek",
                  children: [
                    { name: "Alex" },
                    { name: "Stasio" },
                    {
                      name: "Paulina",
                      children: [{ name: "Kuba" }, { name: "Kacper" }],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

//  A ************************************************************************************

const resultsv3 = [];
let searchNames = (obj, searchPhrase, searchPhrase2, searchPhrase3) => {

  Object.keys(obj).forEach((key) => {
    let searchingValue = obj[key];

    if ((key === searchPhrase || key === searchPhrase2 || key === searchPhrase3) && typeof searchingValue !== 'object') {
      resultsv3.push(searchingValue);
    } else if (typeof searchingValue === 'object') {
      searchNames(searchingValue, searchPhrase, searchPhrase2, searchPhrase3);
    }
  });
  return resultsv3;

};

searchNames(nestedObject, 'name', 'name2', 'name3');
console.log("ZADANIE 7A TABLICA Z IMIONAMI =>", resultsv3);

//  B ************************************************************************************


let id = 0;
let name2index = [];
let name3index = [];
const results = [];
searchNames = (obj, searchPhrase, searchPhrase2, searchPhrase3) => {

  Object.keys(obj).forEach((key, index) => {
    let searchingValue = obj[key];


    if ((key === searchPhrase || key === searchPhrase2 || key === searchPhrase3) && typeof searchingValue !== 'object') {
      id++;
      if (key === 'name2') {
        name2index.push(id - 1);
        results.push(searchingValue);

      }
      else if (key === 'name3') {
        name3index.push(id - 1);
        results.push(searchingValue);

      }
      else results.push(searchingValue)

    } else if (typeof searchingValue === 'object') {
      searchNames(searchingValue, searchPhrase, searchPhrase2, searchPhrase3);
    }
  });
  return results;

};

searchNames(nestedObject, 'name', 'name2', 'name3');


let arrAllNames = [];

results.map((el, index) => {

  if (name2index.includes(index)) {

    arrAllNames.pop();
    el = results[index - 1] + " " + results[index];
    return arrAllNames.push(el)
  }

  else if (name3index.includes(index)) {

    arrAllNames.pop();
    el = results[index - 2] + " " + results[index - 1] + " " + results[index];

    //tradycyjna konkatenacja jest ok, ale też można użyć template string np:
    // el = `${results[index - 2]} ${results[index - 1]} ${results[index]}`

    return arrAllNames.push(el)
  }

  else {

    return arrAllNames.push(el)

  }

});


// console.log(results);
// console.log(name2index);
console.log("ZADANIE 7B, KILKA IMION W 1 STRINGU", arrAllNames);


