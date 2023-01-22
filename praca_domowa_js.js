/* 
      1. Napisz funkcję mapującą, która utworzy klucz(właściwość) nickname na każdej osobie w tablicy w następujący sposób:
      a) pobierze 3 pierwsze litery imienia, odwróci ich kolejność i zapisze do zmiennej
      //onazoL
      //Lozano
      b) pobierze 3 ostatnie litery nazwiska, zamieni kolejnością pierwszą i ostatnią i dołączy powstały string do poprzedniego
      c*) Zmieni wielkość liter w taki sposób, żeby powstały nick zaczynał się wielką literą i nie miał żadnych wielkich liter poza 1.
      d) Jeżeli liczba znaków w imieniu bądź nazwisku jest mniejsza niż 3, nickname będzie odpowiednio krótszy 
      e) rozważcie wszystkie skrajne przypadki, ponieważ Waszą funkcję mapującą wrzucimy do testów na platformie
      e) Have fun :)
      Na przykład:
      Dla osoby: 
      {
          firstName: 'Bartolomeo',
          lastName: 'Lozano'
      }
      powinniśmy uzyskać nickname Rabona
      Hints:
      - mając zmienną name = 'Bart'
        name.split('') => ['B', 'a', 'r', 't'] - tworzymy tablicę liter ze stringa
        ['B', 'a', 'r', 't'].join('') => 'Bart' - odwracamy ten proces
      - Na tablicy możemy użyć metody reverse()
      - Na stringach czy pojedynczych literkach możemy używać metod toLowerCase(), toUpperCase()
  */

// const people = [
//   {
//     firstName: "Bartolomeo",
//     lastName: "Lozano",
//   },
//   {
//     firstName: "Mateo",
//     lastName: "Loza",
//   },
// ];

// const peopleWithNickname = people.map(function (item, index) {
//   const firstNameArray = item.firstName.split("");
//   const reversedNamesLetters = firstNameArray
//     .filter(function (item, index) {
//       if (index < 3) {
//         return item;
//       }
//     })
//     .reverse();

//   const lastNameArray = item.lastName.split("");
//   const reversedLastNamesLetters = lastNameArray
//     .reverse()
//     .filter(function (item, index) {
//       if (index < 3) {
//         return item;
//       }
//     });
//   const nicknameString =
//     reversedNamesLetters.join("").toLowerCase() +
//     reversedLastNamesLetters.join("").toLowerCase();
//   const nicknameArray = nicknameString.split("");
//   nicknameArray[0] = nicknameArray[0].toUpperCase();
//   const nickname = nicknameArray.join("");
//   item.nickname = nickname;
//   return item;
// });

/* 
    2. 
    a) Do każdego obiektu dodaj funkcję introduceYourself, która za pomocą słówka this wyświetli w konsoli tekst powitalny.
    Oczywiście tekst powinien wyświetlić się dopiero po wywołaniu funkcji.
    Dla powyższego przykładu tekst powinien wyglądać w następujący sposób:
    "Cześć jestem Bartolomeo Lozano, ale w szkole mówią na mnie [Rabona]"
    Natomiast wywołanie funkcji: people[0].introduceYourself()
    Obiekt z przykładu powinien wyglądać w ten sposób
    {
        firstName: "Bartolomeo",
        lastName: "Lozano",
        nickname: "Rabona",
        introduceYourself: // tutaj ma się znajdować funkcja
    },
    b) za pomocą pętli forEach, wywołaj funkcję powitalną dla każdego elementu tablicy. W rezultacie na ekranie powinien
    pojawić się tekst powitalny dla każdej osoby w tablicy
    Hints:
    - nie używaj w tym zadaniu funkcji strzałkowej, ponieważ słówko this Ci nie zadziała i nie będziesz miał(a)
    dostępu do this.firstName lastName i nickname
    - postaraj się zdefiniować funkcję powitalną tylko raz (nie rób tego w pętli, ani funkcji map)
    
*/

// function introduceYourself() {
//   return `Cześć jestem ${this.firstName} ${this.lastName}, ale w szkole mówią na mnie ${this.nickname}`;
// }

// const peopleWithNicknameAndFunction = peopleWithNickname.map(function (item) {
//   const newItem = { ...item, introduceYourself };
//   return newItem;
// });

// peopleWithNicknameAndFunction.forEach(function (item) {
//   console.log(item.introduceYourself());
// });

/*
    3. 
    a) Dodaj do każdego obiektu funkcję getFavouriteColor
    b) funkcja ma przyjmować jeden parametr typu number z zakresu 1 - 30
    c) jeżeli podany parametr jest poza zakresem, powinien wyświetlić się odpowiedni komunikat
        - podałeś za małą liczbę, liczba nie może być mniejsza niż 1
        - podałeś za dużą liczbę, liczba nie może być większa niż 30
    d) w przypadku wywołania funkcji bez parametru, powinniśmy ustawić domyślną wartość na 5
    e) funkcja powinna zsumować wszystkie litery imienia, nazwiska i przezwiska, 
    odjąć od tej sumy liczbę wprowadzoną w parametrze, a następnie za pomocą działania modulo (%) względem długości tablicy kolorów
    wyznaczyć index
    f) za pomocą indexu funkcja powinna wyciągnąć odpowiedni kolor z tablicy i wyświetlić go w konsoli.
    Dla powyższego przykładu i liczby 5 wprowadzonej w parametrze, powinniśmy uzyskać wynik:
    (22 - 5) % 6 = 5
    console.log("orange")
    Hints
    - jeżeli po odjęciu parametru funkcji od sumy liter uzyskacie wartośc ujemną, możecie użyć metody z biblioteki Math, 
    Math.abs(-20), która zamieni liczbę na wartość absolutną, czyli dodatnią
    - w funkcji musicie użyć słówka this, parametru i tablicy, która jest na zewnątrz, tablica z kolorami może mieć
    dowoloną ilość kolorów
*/

// const colors = ["red", "green", "yellow", "blue", "pink", "orange"];

// function getFavouriteColor(number) {
//   let check = 0;
//   if (number < 1) {
//     check = 1;
//     return `Podałeś za małą liczbą, liczba nie moze być mniejsza niz 1`;
//   } else if (number > 30) {
//     check = 1;
//     return `Podałeś za duzą liczbę, liczba nie moze być większa niz 30`;
//   } else if (number === undefined) {
//     number = 5;
//   } else {
//     number;
//   }
//   if (check === 0) {
//     const lettersSum = Math.abs(
//       this.firstName.length +
//         this.lastName.length +
//         this.nickname.length -
//         number
//     );

//     const index = lettersSum % colors.length;
//     const color = colors[index];
//     return color;
//   }
// }
// const peopleWithNicknameFunctionAndColor = peopleWithNicknameAndFunction.map(
//   function (item) {
//     const newObject = { ...item, getFavouriteColor };
//     return newObject;
//   }
// );
// console.log(peopleWithNicknameFunctionAndColor[1].getFavouriteColor(25));
// console.log(peopleWithNicknameFunctionAndColor);

/*
    4. Napisz funkcję analogiczną do funkcji z zadania 3, ale nie dodawaj jej w obiekcie.
    a) funkcja powinna przyjąć 2 parametry (obiekt osoby i liczbę z zakresu 1 - 30)
    b) funkcja powinna wykonać dokładnie takie samo działanie jak poprzednia
    c) Za pomocą pętli for of przeiteruj po wszystkich osobach z tablicy i wyświetl ich ulubione kolory
*/

// function getFavouriteColor2(persons, number) {
//   let check = 0;
//   let favColors = [];
//   if (number < 1) {
//     check = 1;
//     return `Podałeś za małą liczbą, liczba nie moze być mniejsza niz 1`;
//   } else if (number > 30) {
//     check = 1;
//     return `Podałeś za duzą liczbę, liczba nie moze być większa niz 30`;
//   } else if (number === undefined) {
//     number = 5;
//   } else {
//     number;
//   }
//   for (let person of persons) {
//     if (check === 0) {
//       const lettersSum = Math.abs(
//         person.firstName.length +
//           person.lastName.length +
//           person.nickname.length -
//           number
//       );
//       const index = lettersSum % colors.length;
//       const color = colors[index];
//       favColors.push(color);
//     }
//   }
//   return favColors;
// }
// console.log(getFavouriteColor2(peopleWithNicknameAndFunction, 25));

/*
     5. Zadanie polega na użyciu .filter() .map() .reduce w wersji łańcuchowej,
     czyli nie twórz nowych tablic w momencie wykonanie jednej z powyższych metod, połącz wykonanie ze sobą w jeden 
     "łańcuch" tzn. const wynik = arr.filter().map().reduce()
     a) Przefiltruj tablicę w taki sposób, aby zostały w niej osoby,
     których imię kończy się na literę 'a' lub 'k' 
     i nazwisko ma więcej znaków niż 6 
     i nick zawiera w sobie przynajmniej jedną literę a
     b) do powyższego warunku dodaj "furtkę" w postaci parametru isElite. Zmienna isElite powinna być obliczona
     za pomocą generatora liczb pseudolosowych Math.random(). Za pomocą tego generatora wylosujcie liczbę z zakresu 0 - 100.
     Jeżeli wartość losowej liczby będzie liczbą pierwszą lub będzie podzielna przez 3 i 5, ustawcie isElite na true, w pozostałych przypadkach
     isElite powinno być ustawione na false
     c) jeżeli zmienna isElite ma wartość true, nie bierzcie pod uwagę warunku z punktu a przy filtracji
     d) za pomocą funkcji map i for in odwróccie wartości i klucze w obiekcie, usuwając przy tym funkcje
     Przykład
     INPUT
     {
         firstName: "Bartolomeo",
         lastName: "Lozano",
         nickname: "Rabona",
         introduceYourself: '' // funkcja zamiast pustego stringa
         getFavouriteColor: '' // funkcja zamiast pustego stringa
     },
     OUTPUT
     {
         Bartolomeo: "firstName",
         Lozano: "lastName",
         Rabona: "nickname",
     },
     e) zredukuj tablicę obiektów do pojedynczego obiektu, który będzie zawierał wszystkie klucze i wartości
     wszystkich obiektów z tablicy, dzięki temu, że w punkcie d) odwrócilismy klucze z wartościami, nie będzie 
     z tym problemu :)
     *f) odtwórz z obiektu tablicę, która będzie zawierała same nicknames i 
     nazwiska, ktdjest < s i
     imię, którego chociaż jedna litera jest większa >= s
     g) posortuj tablicę alfabetycznie
 */

// const number = Math.trunc(Math.random() * 100);
// function isAPrime(number) {
//   let prime = true;
//   if (number === 1) {
//     prime = false;
//   } else if (number > 1) {
//     for (i = 2; i < number; i++) {
//       if (number % i == 0) {
//         prime = false;
//         break;
//       }
//     }
//   }
//   return prime;
// }
// function isDivisibleBy3And5(number) {
//   if (number % 3 === 0 && number % 5 === 0) {
//     return true;
//   } else {
//     return false;
//   }
// }
// const isElite =
//   isAPrime(number) == true || isDivisibleBy3And5(number) == true ? true : false;

// const filteredPeople = peopleWithNicknameFunctionAndColor
//   .filter(function (item) {
//     return (
//       ((item.firstName[item.firstName.length - 1] == "a" ||
//         item.firstName[item.firstName.length - 1] == "k") &&
//         item.lastName.length > 6 &&
//         item.nickname.includes("a")) ||
//       isElite
//     );
//   })
//   .map(function (item) {
//     const reversedObj = {};
//     for (let keys in item) {
//       if (keys != "introduceYourself" && keys != "getFavouriteColor") {
//         reversedObj[item[keys]] = keys;
//       }
//     }
//     return reversedObj;
//   })
//   .reduce(function (acc, curr) {
//     for (keys in curr) {
//       acc[keys] = curr[keys];
//     }
//     return acc;
//   }, {});

// console.log(filteredPeople);

// console.log(number);
// console.log(isAPrime(number));
// console.log(isDivisibleBy3And5(number));
// console.log(isElite);

/*
    *6. Currying function
    a) Napisz taką funkcję mnożącą 2 liczby, aby możliwe były następujące wywołania:
    - multi(5)(6)
    - const multiplyBySix = sum(6)
      multiplyBySix(10)
    b) Analogicznie napisz funkcję, która mnoży 4 liczby i możliwe jest wywołanie
    - multi(4)(5)(6)(10)

    Hints:
    - funkcja może zwracać inne funkcje
    - funkcja może korzystać ze zmiennych i parametrów funkcji zewnętrznych (czyli tych w których się znajduje)
*/

// function multi(a) {
//   return function (b) {
//     console.log(a * b);
//   };
// }
// multi(5)(6);

// function sum(a) {
//   return function multi(b) {
//     console.log(a * b);
//   };
// }
// const multiplyBySix = sum(6);
// multiplyBySix(10);

// function multi2(a) {
//   return function (b) {
//     return function (c) {
//       return function (d) {
//         console.log(a * b * c * d);
//       };
//     };
//   };
// }
// multi2(4)(5)(6)(10);

/*
    **7. Rekurencja
     a) Mając zagnieżdżony obiekt, wyciągnij z niego wszystkie imiona i dodaj do tablicy
     ***b) Jeżeli osoba ma więcej niż jedno imię, te imiona powinny znajdować się w jednym stringu w tablicy
     Na przykład 'Kamil Bartek'
    INPUT:
*/
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

const names = [];

function arrOfNames(object) {
  let personsNames = [];
  if (object.name) {
    personsNames.push(object.name);
  }
  if (object.name2) {
    personsNames.push(object.name2);
  }
  if (object.name3) {
    personsNames.push(object.name3);
  }
  if (personsNames.length) {
    names.push(personsNames);
  }
  if (object.children) {
    object.children.forEach(function (item) {
      arrOfNames(item);
    });
  }
}
arrOfNames(nestedObject);
console.log(names);
