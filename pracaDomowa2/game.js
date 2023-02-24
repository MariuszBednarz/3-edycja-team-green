
const canvas = document.getElementById("canvas-1");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 500;
let eatenNum = 0;
let savedNum = 0;
let lostNum = 0;
const keys = [];
let allEnemies = [];
let allAlies =[];


const player = {
x: 0,
y: 200,
width: 40,
height: 72,
frameX: 0,
frameY: 0,
speed: 4,
moving: false,
radius: 36,
};

const boom = {
x: 0,
y: 0,
width: 115,
height: 95,
frameX: 2,
frameY: 0,
};



const mainPlayer = new Image();
mainPlayer.src = "assets/gameassets/chewie.png";
const background = new Image();
background.src = "assets/gameassets/background.png";
const collision = new Image();
collision.src = "assets/gameassets/boom-2.png";

class Allies {
    constructor(x, y, speed, allyID){
        this.x = Math.floor(Math.random() * 200) + x;
        this.y = y;
        this.speed = speed;
        this.moving = false;
        this.allAlies = ["ally-1.png","ally-2.png","ally-3.png","ally-4.png","ally-5.png","ally-6.png","ally-7.png","ally-8.png","ally-9.png","ally-10.png","ally-11.png","ally-12.png"];
        this.randomAlly = this.allAlies[Math.floor(Math.random() * this.allAlies.length)];
        this.allyShuffle = new Image();
        this.allyShuffle.src = `assets/gameassets/${this.randomAlly}`;
        this.allyShuffle.onload = () => {
            this.width = this.allyShuffle.width / 4 ;
            this.height = this.allyShuffle.height / 4;
        };
        this.frameX = 0;
        this.frameY = 3;
        this.radius = 36;
        this.allyID = allyID;
    }

draw() {

    if(this.frameX < 3) this.frameX ++
    else this.frameX = 0

    if(this.y >= 100) { 
    ctx.drawImage(this.allyShuffle, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width, this.height);
    this.y -= this.speed;
    }
    if(this.y === 100) {
        savedNum++;
        let index2 = allAlies.indexOf(this);
        allAlies.splice(index2, 1);
    }


//COLLISION ENEMY WITH ALLY 

for(let i = 0; i < allEnemies.length; i++) {
    let enemy = allEnemies[i];
    
    let dx = this.x - enemy.x;
    let dy = this.y - enemy.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let sumofRadius = this.radius + enemy.radius;
        
    if(distance < sumofRadius){ 
        lostNum++;
        ctx.drawImage(collision, boom.width * boom.frameX, boom.height * boom.frameY, boom.width, boom.height, this.x, this.y, boom.width, boom.height);
        let index2 = allAlies.findIndex(ally => ally.id === this.id);
        allAlies.splice(index2, 1);
        allEnemies.splice(index2, 1);
        delete this;
    }}}}

class Enemies {
    constructor(x, y, speed, enemyID){
        this.x = x;
        this.y = Math.floor(Math.random() * (400 - 110 + 1) + 110);
        this.speed = speed;
        this.moving = false;
        this.allEnemies = ["enemy-1.png","enemy-2.png","enemy-3.png","enemy-4.png","enemy-5.png","enemy-6.png","enemy-7.png","enemy-8.png","enemy-9.png","enemy-10.png","enemy-11.png","enemy-12.png"];
        this.randomEnemy = this.allEnemies[Math.floor(Math.random() * this.allEnemies.length)];
        this.enemyShuffle = new Image();
        this.enemyShuffle.src = `assets/gameassets/${this.randomEnemy}`;
        this.enemyShuffle.onload = () => {
            this.width = this.enemyShuffle.width / 4 ;
            this.height = this.enemyShuffle.height / 4;
        };
        this.frameX = 0;
        this.frameY = 1;
        this.radius = 36;
        this.enemyID = enemyID;
    }

    
    draw() {

    if(this.frameX < 3) this.frameX ++
    else this.frameX = 0

    if(this.x > 0) { 
    ctx.drawImage(this.enemyShuffle, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width, this.height);
    this.x -= this.speed;
    }
    if(this.x < 0) {
        let index = allEnemies.indexOf(this);
        allEnemies.splice(index, 1);
    }
    

    let dx = this.x - player.x;
    let dy = this.y - player.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let sumofRadius = this.radius + player.radius;

//COLLISION ENEMY WITH PLAYER 
    if(distance < sumofRadius){ 
    eatenNum++;
    ctx.drawImage(collision, boom.width * boom.frameX, boom.height * boom.frameY, boom.width, boom.height, this.x, this.y, boom.width, boom.height)
    let index2 = allEnemies.indexOf(this);
    allEnemies.splice(index2, 1);
    }


    
    }
}

let counterEnemies = 0;
const intervalEnemies = 5000;
let idCounter = 0;
function renderEnemies() {

const intervalEnemies = 5000;
counterEnemies += intervalEnemies / fps;
    if (counterEnemies >= intervalEnemies) {
        counterEnemies = 0;
        idCounter++;
        allEnemies.push(new Enemies(800, 0, 4, idCounter));
    }


    for(let i =0; i< allEnemies.length; i++) {
        allEnemies[i].draw();
    }
}



let counterAlly = 0;
const intervalAlly = 5000;
let idCounterv2 = 0;

function renderAlly() {
counterAlly += intervalAlly / fps;
if (counterAlly >= intervalAlly) {
    counterAlly = 0;
    idCounterv2++;
    allAlies.push(new Allies(0, 500, 4,idCounterv2));
}

for(let i =0; i< allAlies.length; i++) {
    allAlies[i].draw();
}
}


// s from source, how to cropp source image
// d from destination 
function drawPlayer(img, sX, SY, SW, sH, dX, dY, dW, dH) {
ctx.drawImage(img, sX, SY, SW, sH, dX, dY, dW, dH);
}

let lastPressedKey;

window.addEventListener("keydown", function(e){
keys[e.keyCode] = true;
});

window.addEventListener("keyup", function(e) {
delete keys[e.keyCode];    
});

function movePlayer() {
    player.moving = false;
    if(keys[38] && player.y > 100) {
        player.moving = true;
    player.y -= player.speed;
    player.frameY = 3;
    }
    if(keys[37] && player.x > 0) {
        player.moving = true;
    player.x -= player.speed;
    player.frameY = 1;
    }
    if(keys[40] && player.y < canvas.height - player.height) {
        player.moving = true;
    player.y += player.speed;
    player.frameY = 0;
    }
    if(keys[39] && player.x < canvas.width - player.width){
        player.moving = true;
    player.x += player.speed;
    player.frameY = 2;
    }
}



function playerAnimate() {
if(player.frameX < 3 && player.moving) player.frameX ++
else player.frameX = 0
}

function renderResult() {  
ctx.fillText(`Eaten: ${eatenNum}`, 670, 20);
ctx.fillText(`Saved: ${savedNum}`, 670, 50); 
ctx.fillText(`Lost: ${lostNum}`, 670, 80);   
ctx.lineWidth = 100;
ctx.font = "24px Arial";
}


const fps = 30;
const interval = 1000/fps;
let lastTime = 0;
let shouldStop = false;
let requestId;

function animate(timeStamp) {
if (timeStamp - lastTime < interval) { 
    requestId = requestAnimationFrame(animate);  
    return;}

if (shouldStop) {
    return;}
    
lastTime = timeStamp;
ctx.clearRect(0,0,canvas.width,canvas.height);
ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
drawPlayer(mainPlayer, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width, player.height);
movePlayer();
playerAnimate();
renderAlly();
renderEnemies();
renderResult();
requestId = requestAnimationFrame(animate);
}

let startBtnClicked = false;

const startGame = () => {
deleteTable();
paginationWrapper.classList.add("active");
startBtnClicked = !startBtnClicked;
const startBtn = document.getElementById("startGame");
if (startBtn.innerHTML === "Start Game") startBtn.innerHTML = "Stop Game";
else startBtn.innerHTML = "Start Game";

if(startBtnClicked) { 
shouldStop = false;
lastTime = 0;
const wrapper = document.getElementById("gameWrapper");
wrapper.style.display = "block";
requestId = requestAnimationFrame(animate);}
else {
console.log("test");
shouldStop = true;
startBtnClicked = false;}
}

const resetGame = () => {
const startBtn = document.getElementById("startGame");
startBtn.innerHTML = "Stop Game";
startBtnClicked = true;
eatenNum = 0;
savedNum = 0;
lostNum = 0;
allEnemies = [];
allAlies = [];
player.x = 0;
player.y = 200;
shouldStop = false;
requestAnimationFrame(animate);
}

const closeGame = () => {
eatenNum = 0;
savedNum = 0;
lostNum = 0;
allEnemies = [];
allAlies = [];
player.x = 0;
player.y = 200;
shouldStop = true;
const game = document.getElementById("gameWrapper");
game.style.display = "none";
const startBtn = document.getElementById("startGame");
startBtn.innerHTML = "Start Game";
// document.body.style.overflow = "visible";
}

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);