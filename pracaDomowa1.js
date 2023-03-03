//TABLICA TESTOWA
const people = [
  {
    firstName: "Bartolomea",
    lastName: "Lozano",
    nickname: "Rabona",
  },
  {
    firstName: "Bart",
    lastName: "Loz",
    nickname: "Rabo",
  },
  {
    firstName: "Mateuszek",
    lastName: "Lozeeeen",
    nickname: "Teoazo",
  },
  {
    firstName: "Mat",
    lastName: "Loz",
    nickname: "Teo",
  },
];

//  DANE WEJŚCIOWE

// const people = [
//   {
//     firstName: "Bartolomeo",
//     lastName: "Lozano",
//   },
//   {
//     firstName: "Mateo",
//     lastName: "Loza",
//   }
// ];
function createNickname(object) {
  const takeLetter = object.map((a, index) => {
    let fName = object[index].firstName
      .substr(0, 3)
      .split("")
      .reverse()
      .join("")
      .toLowerCase();

    let lName = object[index].lastName
      .substr(object[index].lastName.length - 3)
      .split("")
      .reverse()
      .join("")
      .toLowerCase();

    let nickname = fName.concat(lName);

    const firstLetter = nickname?.slice(0, 1)?.toUpperCase();
    const restOfTheWord = nickname.slice(1);

    return firstLetter + restOfTheWord;
  });

  for (number in object) {
    object[number].nickname = takeLetter[number];
  }
  return object;
}

const result = createNickname(people);

// console.log(result);

//------------------------
//REVIEW: 1. spokojnie można użyć slice() zamiast substr(), to przestarzała metoda. Poza tym działa!
//------------------------


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

//  DANE WEJŚCIOWE
// const people = [
//   {
//     firstName: "Bartolomeo",
//     lastName: "Lozano",
//     nickname: "Rabona",
//   },
//   {
//     firstName: "Mateo",
//     lastName: "Loza",
//     nickname: "Teoazo",
//   },
// ];

for (number in people) {
  people[number].introduceYourself = function introduceYourself() {
    const welcome = `Cześć jestem ${this.firstName} ${this.lastName}, ale w szkole mówią na mnie ${this.nickname}`;
    return welcome;
  };
}

// people.forEach((object) => console.log(object.introduceYourself()));

// console.log(people[0].introduceYourself());

// console.log(people)

//------------------------
//REVIEW: 2. jest ok!
//------------------------


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

//DANE WEJŚCIOWE
// const people = [
//   {
//     firstName: "Bartolomeo",
//     lastName: "Lozano",
//     nickname: "Rabona",
//     introduceYourself: "", // funkcja zamiast pustego stringa
//   },
// ];

const colors = ["red", "green", "yellow", "blue", "pink", "orange"];

for (number in people) {
  people[number].getFavouriteColor = function getFavouriteColor(number) {
    if (number >= 1 && number <= 30) {
      colorIndex =
        (this.firstName.length +
          this.lastName.length +
          this.nickname.length -
          number) %
        colors.length;

      return colors[Math.abs(colorIndex)];
    } else if (number === undefined) {
      number = 5;
      colorIndex =
        (this.firstName.length +
          this.lastName.length +
          this.nickname.length -
          number) %
        colors.length;

      return colors[Math.abs(colorIndex)];
    } else if (number < 1) {
      return "podałeś za małą liczbę, liczba nie może być mniejsza niż 1";
    } else {
      return "podałeś za dużą liczbę, liczba nie może być większa niż 30";
    }
  };
}

// console.log(people)

// console.log(people[1].getFavouriteColor(29));

// people.forEach((object) => console.log(object.getFavouriteColor()));

//------------------------
//REVIEW: 3. jest ok!
//------------------------

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
        22- 27
        console.log("orange")
    
        Hints
        - jeżeli po odjęciu parametru funkcji od sumy liter uzyskacie wartośc ujemną, możecie użyć metody z biblioteki Math, 
        Math.abs(-20), która zamieni liczbę na wartość absolutną, czyli dodatnią
        - w funkcji musicie użyć słówka this, parametru i tablicy, która jest na zewnątrz, tablica z kolorami może mieć
        dowoloną ilość kolorów
    */

/*
        4. Napisz funkcję analogiczną do funkcji z zadania 3, ale nie dodawaj jej w obiekcie.
        a) funkcja powinna przyjąć 2 parametry (obiekt osoby i liczbę z zakresu 1 - 30)
        b) funkcja powinna wykonać dokładnie takie samo działanie jak poprzednia
        c) Za pomocą pętli for of przeiteruj po wszystkich osobach z tablicy i wyświetl ich ulubione kolory
    */

//------------------------
//REVIEW: 4. To jest do lekkiej poprawki. Funkcja jest ok, bo jest poza obiektem, natomiast powinna iterować po obiektach. Spróbuj wywołać funkcję w pętli, a nie na pojedynczej osobie.

// wywołanie powinno przyjmować getFavouriteColor(osoba, numer)
//------------------------


function getFavouriteColor(number, index) {
  if (number >= 1 && number <= 30) {
    colorIndex =
      (people[index].firstName.length +
        people[index].lastName.length +
        people[index].nickname.length -
        number) %
      colors.length;

    return colors[Math.abs(colorIndex)];
  } else if (number === undefined) {
    number = 5;
    colorIndex =
      (people[index].firstName.length +
        people[index].lastName.length +
        people[index].nickname.length -
        number) %
      colors.length;

    return colors[Math.abs(colorIndex)];
  } else if (number < 1) {
    return "podałeś za małą liczbę, liczba nie może być mniejsza niż 1";
  } else {
    return "podałeś za dużą liczbę, liczba nie może być większa niż 30";
  }
}

// const checkPerson = getFavouriteColor(5, 0);

// console.log(checkPerson);

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

function primeCheck(num) {
  if (num <= 1) return false;
  if (num % 2 == 0 && num > 2) return false;
  const s = Math.sqrt(num);
  for (let i = 3; i <= s; i += 2) {
    if (num % i === 0) return false;
  }
  return true;
}
const randomNumber = Math.floor(Math.random() * 101) + 1;
const isElite = primeCheck(randomNumber);

function selection(element) {
  if (isElite == true) {
    return element;
  } else {
    return (
      //------------------------
      //nie wiem czy tu sprawdzana jest długość nicka (6), upewnij się że ten warunek też jest sprawdzany
      //------------------------
      element.lastName.length &&
      element.nickname.includes("a") &&
      //------------------------
      //tu można użyć metody endsWith()
      //------------------------
      (element.firstName[element.firstName.length - 1] === "k" ||
        element.firstName[element.firstName.length - 1] === "a")
    );
  }
}
function resversObject(object) {
  const shift = [];
  for (element in object) {
    if (typeof object[element] !== "function") {
      shift[object[element]] = element;
    }
  }
  return shift;
}
const filteredPeople = people
  .filter(selection)
  .map(resversObject)
  .reduce((acc, next) => {
    for (element in next) {
      acc[element] = next[element];
    }
    return acc;
  }, {});


//------------------------
//nie widzę sortowania alfabetycznego z punktu g)
//------------------------

// console.log(filteredPeople);

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

//------------------------
//6. Jest ok!
//------------------------


function multi(a) {
  return function (b) {
    return a * b;
  };
}
const multiplyBySix = multi(6);

console.log(multi(5)(5));
console.log(multiplyBySix(10));

function multiFourNumbers(a) {
  return function (b) {
    return function (c) {
      return function (d) {
        return a * b * c * d;
      };
    };
  };
}

console.log(multiFourNumbers(2)(2)(2)(2));
/*
        **7. Rekurencja
         a) Mając zagnieżdżony obiekt, wyciągnij z niego wszystkie imiona i dodaj do tablicy
         ***b) Jeżeli osoba ma więcej niż jedno imię, te imiona powinny znajdować się w jednym stringu w tablicy
         Na przykład 'Kamil Bartek'
        INPUT:
    */
//   const nestedpeople = {
//     name: "Kamil",
//     children: [
//       {
//         name: "Zosia",
//       },
//       {
//         name: "Krysia",
//         name2: "Barbara",
//         children: [
//           {
//             name: "Basia",
//             children: [
//               {
//                 name: "Monika",
//                 name2: "Viola",
//                 children: [
//                   {
//                     name: "Mateusz",
//                   },
//                   {
//                     name: "Sebastian",
//                     name2: "August",
//                     name3: "Franciszek",
//                     children: [
//                       { name: "Alex" },
//                       { name: "Stasio" },
//                       {
//                         name: "Paulina",
//                         children: [{ name: "Kuba" }, { name: "Kacper" }],
//                       },
//                     ],
//                   },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   };
