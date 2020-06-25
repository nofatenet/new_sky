const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

// Images:
let canyon = new Image;
canyon.src = "./images/canyon.png"; // 512x1024 px
let bat = new Image;
bat.src = "./images/bat.png"; // The Bat? Again!?
let enemies = new Image;
enemies.src = "./images/enemies1.png";
let enemyNo = Math.round(Math.random() * 4); // There are 5 in the Sprite(0-4)

let eOwnSpeed = 1;

let passed = 0;

// Player Speed:
let speed = 2;
let maxSpeed = 50;

function speedTest(){
    if(speed >= maxSpeed){
        speed = maxSpeed;
    } else if(speed <= 0) {
        speed = 0;
    } else {
        speed = speed;
    }
    // Display Speed in the HTML:
    document.querySelector(".speedMeter .speed").innerHTML = speed;
    // Show Speed in the Fog (in css):
    document.querySelector("#scoreBoard").style.opacity = 0.1 * speed / 2 + 0.3;
}

// Player Pos.:
let posX = 240;
let posY = 600;
// Enemy Pos:
let EposX = 160;
let EposY = 400;
let EposX2 = Math.round(Math.random() * 320+80);
let EposY2 = Math.round(Math.random() * 320-80);

const PADDLE_img = new Image();
PADDLE_img.src = "img/paddel2.png";

function drawPlayer() {
    //ctx.fillStyle = "#777";
    //ctx.fillRect(player.x, player.y, player.width, player.height);
    
    //ctx.strokeStyle = "ffcd00";
    //ctx.strokeRect(player.x, player.y, player.width, player.height);
    ctx.drawImage(bat, player.x, player.y);
}

const player = {
    width: 100,
    height: 100,
    x: posX,
    y: posY
}
const enemy = {
    width: 100,
    height: 100,
    x: EposX,
    y: EposY
}

function ThePositions(){

player.x = posX;
enemy.x = EposX;

}

/*
function HitTest(){

    if(
        // (enemy.x + enemy.width < player.x + player.width && enemy.x > player.x && player.y > player.height && enemy.y > player.y)    
    ){
            console.log("%cHIT", "color: #c80");
    }
}
/*
        ((player.y + player.height) < (enemy.y)) ||
        (player.y > (enemy.y + enemy.height)) ||
        ((player.x + player.width) < enemy.x) ||
        (player.x > (enemy.x + enemy.width))
*/

// Enemies:
function enemiesSpawn(){
    ctx.drawImage(enemies, enemyNo * 60, 0, 60, 124, EposX, EposY, 60, 124);
}
function enemiesSpawn2(){
    ctx.drawImage(enemies, enemyNo * 60, 0, 60, 124, EposX2, EposY2, 60, 124);
}
// Enemy Speed:
function Espeed(){
    Espeedy = speed/4 + eOwnSpeed;
    EposY += Espeedy;
    if(EposY >= 800){
        EposY = 0;
        EposX = Math.round(Math.random() * 320 + 80);

        //eOwnSpeed += 0.1;
        console.log("Enemy Speed: " + Espeedy);

        passed++;

        zzfx(...[.4,1,70,.19,,.4,2,.1,,,-3,.2,.2,,,,.3,.7,.1]); // Passed Snd

        console.log("%cPassed an Enemy!", "color: #c80");

        let getTime = new Date();
        console.log(passed + " Enemies Passed. On: " + getTime.toISOString());
        
        console.log(player.x);
        console.log(enemy.x);
    }
    // Enemy Number 2
    EposY2 += Espeedy;
    if(EposY2 >= 800){
        EposY2 = 0;
        EposX2 = Math.round(Math.random() * 320 + 80);
    }

}

// Controls:
function moveLeft(){
    posX -= 4;
    if(posX <= 120){ posX = 120 }; // Game Area Limit - Left Wall
}
function moveRight(){
    posX += 4;
    if(posX >= 360){ posX = 360 }; // Game Area Limit - Right Wall
}

document.addEventListener("keydown", (event) => {
    // console.log(event.keyCode); // See what the Code of the Key is
    switch(event.keyCode){
        case 37: // Left Arrow Key - Go left
            moveLeft();
            break;
        case 38: // Up Arrow Key - Speed up
            speed += 1;
            break;
        case 39: // Right Arrow Key - Go right
            moveRight();
            break;
        case 40: // Down Arrow Key - Slow down
            speed -= 4;
            break;
        default:
            break;
    }
});

// Game-Loop:
canyon.onload = () => {
    requestAnimationFrame(Loop);
}

// Background-Repeat:
let yOffset = -512;

function Loop(){
    if (yOffset >= 0) {
        yOffset = -1024;
    }
    ctx.drawImage(canyon, 0, yOffset);
    ctx.drawImage(canyon, 0, yOffset + 1024);
    ctx.drawImage(canyon, 0, yOffset + 2048);

    yOffset += speed/4;     // Divided by Speed Limiter
    speedTest();

    ctx.drawImage(bat, posX, posY);

    drawPlayer();

    enemiesSpawn();
    enemiesSpawn2();
    Espeed();

    ThePositions();
    //HitTest();

    requestAnimationFrame(Loop);
}
