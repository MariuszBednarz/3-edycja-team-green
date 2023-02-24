const people = [
  {
    firstName: "Bartolomeo",
    lastName: "Lozano",
    introduceYourself: function () {
      console.log(
        `Cześć jestem ${this.firstName} ${this.lastName}, ale w szkole mówią na mnie ${this.nickName}`
      );
    },
  },
  {
    firstName: "Mateo",
    lastName: "Loza",
    introduceYourself: function () {
      console.log(
        `Cześć jestem ${this.firstName} ${this.lastName}, ale w szkole mówią na mnie ${this.nickName}`
      );
    },
  },
  {
    firstName: "Kamil",
    lastName: "Lisiecki",
    introduceYourself: function () {
      console.log(
        `Cześć jestem ${this.firstName} ${this.lastName}, ale w szkole mówią na mnie ${this.nickName}`
      );
    },
  },
];

//----------------------------
//fajnie by było spróbować dodać funkcje introduceYourself i getFavouriteColor za pomocą logiki, dodając do obiektu źródłowego, a nie wpisywać ręcznie
//----------------------------

//ZAD. 1

function mapFunction(person) {
  let nickName =
    person.firstName.slice(0, 3).toLowerCase().split("").reverse().join("") +
    person.lastName.slice(-3).toLowerCase().split("").reverse().join("");
  nickName = nickName.charAt(0).toUpperCase() + nickName.slice(1);
  const newPerson = { ...person, nickName };
  return newPerson;
}
const result = people.map(mapFunction);
console.log(result);

//ZAD. 2
// PONIEJ WYWOŁANIE FUNKCJI DO .THIS - introduceYourself

result[0].introduceYourself(); // TUTAJ PODAJ DLA KTÓREGO OBIEKTU CHCESZ WYWOŁAĆ FUNKCJĘ.

// FOR EACH - wywołuje w consoli przywitanie dla kazdego obiektu z tablicy.
result.forEach(function (result) {
  result.introduceYourself();
});

//ZAD. 3

function lengthFunction(person1) {
  let legthOf =
    person1.firstName.length +
    person1.lastName.length +
    person1.nickName.length;
  return legthOf;
}

const resultX = result.map(lengthFunction);
console.log(resultX);

function getFavouriteColor(number) {
  const colors = ["red", "green", "yellow", "blue", "pink", "orange"];
  let num = number;
  let indexOfColor;
  let favoriteColor;
  if (number > 30) {
    console.log(" Podałeś za dużą liczbę, liczba nie może być większa niż 30");
  } else if (number < 1) {
    console.log("Podałeś za małą liczbę, liczba nie może być mniejsza niż 1");
  } else if (number == null || number == undefined) {
    num = 5;
    return num;
  } else if (num >= 1 && num <= 30) {
    indexOfColor = Math.abs(resultX[i] - num) % colors.length;
    favoriteColor = colors[indexOfColor];
  }
  return favoriteColor;
}

for (i = 0; i < result.length; i++) {
  console.log(
    "Favorite color of",
    result[i].firstName,
    result[i].lastName,
    "is",
    getFavouriteColor(5) // PODAJEMY WARTOŚĆ DO UZYSKANIA ULUBIONEGO KOLORU.
  );
}
//ZAD. 4 ?? - podobne do zadania 3.

//----------------------------
//funkcja getFavouriteColor powinna iterować po tablicy, przyjmować obiekt osoby i numer w zadaniu 4, natomiast w zadaniu 3 ta funkcja powinna być dodana jako metoda w obiekcie i wywołana
//----------------------------

//ZAD. 5

// a
const wynik = result.filter(
  (lastLength) =>
    lastLength.firstName.endsWith("o") &&
    lastLength.lastName.length >= 6 &&
    lastLength.nickName.includes("a")
);

// b
const randomNumber = Math.floor(Math.random() * 101);
console.log(randomNumber);

if (randomNumber % 3 === 0 || randomNumber % 5 === 0) {
  isElite = true;
} else {
  isElite = false;
}

// c
for (i = 0; i < result.length; i++) {
  if (isElite === true) {
    console.log(result);
    break;
  }
}

// d
const mapF = result
  .map((person3) => {
    const invertedPerson = {};
    for (const key in person3) {
      if (typeof person3[key] !== "function") {
        invertedPerson[person3[key]] = key;
      }
    }
    return invertedPerson;
  })
  .reduce((acc, person) => ({ ...acc, ...person }), {});
// .endsWith() zwraca tylko te obiekty zakończone podaną literą.
// link do MDM: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith

console.log(wynik); // podaje cyfrę i pokazuje odpowiednio jedną osobe if true lub wszystkie(false).
console.log(isElite); // true lub false - do powyzszego, pokazuje dodatkowo w consoli true lub false.
console.log(mapF); // consoluje działanie reduce, usuwa funkcję introduceYourSelf.

// 6.

// - multi(5)(6)

function task6(x) {
  return function (y) {
    return x * y;
  };
}

console.log(task6(5)(6));

//  - const multiplyBySix = sum(6)
//  - multiplyBySix(10)

const multiplyBySix = task6(5);
console.log(multiplyBySix(6));

//   b) Analogicznie napisz funkcję, która mnoży 4 liczby i możliwe jest wywołanie
// - multi(4)(5)(6)(10)

function task6b(x) {
  return function (y) {
    return function (z) {
      return function (w) {
        return x * y * z * w;
      };
    };
  };
}

console.log(task6b(1)(2)(3)(4));

// 7.

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

// 7 (a) (b)

//----------------------------
//Ta funkcja nie do końca działa jak powinna. Zwraca imiona kilkukrotnie. "Kamil" w obiekcie wystepuje 1 raz, a w konsoli jest wyświetlony kilkukrotnie
//----------------------------

function allName(arrayNames, newAr) {
  let cuestB = [];
  if (arrayNames.name) {
    newAr.push(arrayNames.name);
    cuestB.push(arrayNames.name);
  }
  if (arrayNames.name2) {
    newAr.push(arrayNames.name2);
    cuestB.push(arrayNames.name2);
  }
  if (arrayNames.name3) {
    newAr.push(arrayNames.name3);
    cuestB.push(arrayNames.name3);
  }
  if (cuestB.length > 0) {
    newAr.push(cuestB.join(" "));
  }

  if (arrayNames.children) {
    arrayNames.children.forEach((kido) => allName(kido, newAr));
  }
}
const newAr = [];

allName(nestedObject, newAr);
console.log(newAr);
