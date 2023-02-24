class Base {
    constructor(name, url, created) {
       this.name = name;
       this.url = url;
       this.created = created;
    }
   }
   class People extends Base {
       constructor(name, url, created, homeworld, gender, height) {
           super(name, url, created)
           this.gender = gender;
           this.height = height;
           this.homeworld = homeworld;
       
   }
       strength() {
           return Math.floor(this.height * 0.25 + this.homeworld.length * 0.4 + this.gender.length * -0.15);
           
       }
   
   }
    class Films extends Base {
       constructor(name, url, created, director, release_date, producer) {
           super(name, url, created)
         
           this.director = director;
           this.release_date = release_date;
           this.producer = producer;
   }
       movie() {
           let date1 = new Date(this.release_date);
           let date2 = new Date();
           let diffInYears =  date2.getFullYear() - date1.getFullYear();
           return diffInYears;
       }
   
   } 
   class Planets extends Base {
       constructor(name, url, created, diameter, population, terrain) {
        super(name, url, created)
        this.diameter = diameter;
        this.population = population;
        this.terrain = terrain;
        
   }
       calculateDensity() {
       const radius = this.diameter / 2;
       const surface =  4 * Math.PI * Math.pow(radius, 2);
       const density = (this.population / surface) * 1000;
       return density.toFixed(3)
       }
   
   } 
   class Species extends Base {
       constructor(name, url, created, classification, language, skin_colors) {
        super(name, url, created)
        this.classification = classification;
        this.language = language;
        this.skin_colors = skin_colors;
        
   }
   generateNickname() {
       let nickname = "";
       nickname += this.classification.slice(0,3);
       nickname += this.name.slice(0,2);
       nickname += this.skin_colors.split(', ')[0].slice(0,3);
       return nickname;
   }
   
   
   }   
   class Vehicles extends Base {
       constructor(name, url, created, model, passengers, max_atmosphering_speed) {
       super(name, url, created)
       this.model = model;
       this.passengers = passengers;
       this.max_atmosphering_speed = max_atmosphering_speed;
            
       }
       currentMileage() {
           let time = Math.floor(Math.random() * (1000000 - 500000 + 1) + 500000);
           const mileAge = Math.floor((time * this.max_atmosphering_speed) / 3600);
           return mileAge + "km";
           
       }
   } 
   class Starships extends Base {
       constructor(name, url, created, crew, consumables, model) {
       super(name, url, created)
       this.crew = crew;
       this.consumables = consumables;
       this.model = model;
       }
   calculateTimeLeft(){
   
   let numOfTime = parseInt(this.consumables.match(/\d+/));
   let timeDimension = this.consumables.match(/[a-zA-Z]+/)[0];
   
   switch (timeDimension) {
       case "week": case "weeks":
           numOfTime *= 7;
           break;
       case "month": case "months":
           numOfTime *= 30;
           break;
       case "year": case "years":
           numOfTime *= 365;
           break;
        case "day": case "days":
            numOfTime *= 1
            break;
       default:
           return "Invalid time unit in consumables";
   }
   
   return numOfTime + "Dni"
   
   }
   
   
   } 