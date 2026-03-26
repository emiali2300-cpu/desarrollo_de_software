/*
 * Detection of collisions between boxes
 *
 * Gilberto Echeverria
 * 2025-03-13
 */

"use strict";

// Global variables
const canvasWidth = 800;
const canvasHeight = 600;

// Context of the Canvas
let ctx;

// A variable to store the game object
let game;

// Variable to store the time at the previous frame
let oldTime =0;

let playerSpeed = 0.5;

// Class que contendra las caracteristicas de la pelota ademas de sus metodos

class ball {
    constructor(){
        this.x = canvasWidth/2;
        this.y= canvasHeight/2 +70;
        this.radio = 15;
        this.directiony= 1;
        this.directionx =1;
        this.lives = 3;
        this.velocity = 0.3;
    }
    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    }
    update(deltaTime){
        this.x += this.velocity *this.directionx * deltaTime;
        this.y += this.velocity *this.directiony * deltaTime;
        this.clampWithinCanvas();
    }
    clampWithinCanvas() {
        if (this.y < 0) {
            this.directiony *=-1
        }  if (this.y > canvasHeight) {
            this.directiony *=-1
            this.lives -=1
        }  if (this.x < 0) {
            this.directionx *=-1
        }  if (this.x > canvasWidth) {
            this.directionx *=-1
        }
    }
}
// clase que contiene la paleta 
class Player extends GameObject {
    constructor(position, width, height, color, sheetCols) {
        super(position, width, height, color, "player", sheetCols);
        this.velocity = new Vector(0, 0);
        this.motion = {
            up: {
                axis: "y",
                sign: -1,
            },
            left: {
                axis: "x",
                sign: -1,
            },
            down: {
                axis: "y",
                sign: 1,
            },
            right: {
                axis: "x",
                sign: 1,
            },
        }

        // Keys pressed to move the player
        this.keys = [];
    }

    update(deltaTime) {
        // Restart the velocity
        this.velocity.x = 0;
        this.velocity.y = 0;
        // Modify the velocity according to the directions pressed
        for (const direction of this.keys) {
            const axis = this.motion[direction].axis;
            const sign = this.motion[direction].sign;
            this.velocity[axis] += sign;
        }
        // TODO: Normalize the velocity to avoid greater speed on diagonals
        this.velocity = this.velocity.normalize().times(playerSpeed);
        this.position = this.position.plus(this.velocity.times(deltaTime));

        this.clampWithinCanvas();
    }

    clampWithinCanvas() {
        if (this.position.y - this.halfSize.y < 0) {
            this.position.y = 0 + this.halfSize.y;
        }  if (this.position.y + this.halfSize.y > canvasHeight) {
            this.position.y = canvasHeight - this.halfSize.y;
            gr = true;
        }  if (this.position.x - this.halfSize.x < 0) {
            this.position.x  = 0 + this.halfSize.x;
        }  if (this.position.x + this.halfSize.x > canvasWidth) {
            this.position.x = canvasWidth -this.halfSize.x;
        }
    }
}


// Class to keep track of all the events and objects in the game
class Game {
    constructor() {
        this.createEventListeners();
        this.initObjects();
        this.blockromp = 0;
        this.gameOver = false;
        this.col = 10;
        this.ren = 5;
        this.blr = 0;
        this.blr2 = 0;
        this.time = 0;
        this.limittime = 10 * 1000;
        this.spapress = false;
    }

    initObjects() {
        this.player = new Player(new Vector(canvasWidth / 2, canvasHeight - 50), 140, 10, "red");
        this.ball = new ball();
        this.actors = [];
        this.blwidth = canvasWidth / this.col;
        this.blheight = 200 / this.ren; // zona de bloques

        for (let r = 0; r < this.ren; r++) {
            for (let c = 0; c < this.col; c++) {

                const posX = c * this.blwidth + this.blwidth/2;
                const posY = 50 + r * this.blheight + this.blheight/2;

                const box = new GameObject(new Vector(posX, posY),this.blwidth - 5,this.blheight - 5,"grey");
                box.destroy = false;
                this.actors.push(box);
            
            }
        }
        this.lenp = this.actors.length;
    }
    draw(ctx) {
        for (let actor of this.actors) {
            actor.draw(ctx);
        }
        this.ball.draw(ctx);
        this.player.draw(ctx);
    }

    update(deltaTime) {
        // Move the player
        this.player.update(deltaTime);
        this.ball.update(deltaTime);
        if(this.spapress){
            this.time =deltaTime;
            this.limittime -= this.time;
            if(this.limittime <= 0){
                this.ball.lives = 0;
            }
        }

        if (this.ball.x >= this.player.position.x - this.player.halfSize.x &&
            this.ball.x <= this.player.position.x + this.player.halfSize.x &&
            this.ball.y + this.ball.radio >= this.player.position.y - this.player.halfSize.y &&
            this.ball.y - this.ball.radio <= this.player.position.y + this.player.halfSize.y) 
                {
                this.ball.directiony *= -1;
                }
        for (let actor of this.actors) {
            if (this.ball.x >= actor.position.x - actor.halfSize.x &&
                this.ball.x <= actor.position.x + actor.halfSize.x &&
                this.ball.y + this.ball.radio >= actor.position.y - actor.halfSize.y &&
                this.ball.y - this.ball.radio <= actor.position.y + actor.halfSize.y 
                ) {
                if(this.ball.x - actor.position.x > this.ball.y - actor.position.y){
                    this.ball.directionx *= -1;
                    
                }
                else{
                    this.ball.directiony*=-1;
                }
                this.actors.splice(this.actors.indexOf(actor), 1);
                this.blockromp += 1;
            }    

        }
        // combrobamos la cantidad de bloques rotos para que yaa sea se le aumente vida al jugador o se aumente el tiempo o que gane el mismo
        
        if(this.blockromp % 10 == 0 && this.blockromp != 0 && this.blr != this.blockromp){
            this.ball.lives += 2;
            this.blr = this.blockromp;
        }
        if(this.blockromp % 5 == 0 && this.blockromp != 0 && this.blr2 != this.blockromp){
            this.limittime += 2 *1000;
            this.blr2 = this.blockromp;
        }
        if(this.actors.length == 0){
            this.ball.x = canvasWidth/2;
            this.ball.y = canvasHeight/2 + 70;
            this.directionx = 0;
            this.directiony = 0;
            this.ball.lives = 10;
        }
        // comprobamos en todo momento si el jugador perdio
        if(this.ball.lives <= 0){
            this.ball.x = canvasWidth/2;
            this.ball.y = canvasHeight/2 +70;
            this.directionx = 0;
            this.directiony = 0;
            this.gameOver = true;
        }
        //codigo con todos los textos que salen dentro del mismo
        if(this.gameOver){
            ctx.fillStyle = "red";
            ctx.font = "60px Arial";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", canvasWidth/2, canvasHeight/2);

            ctx.font = "20px Arial";
            ctx.fillText("Presiona espacio para volver a empezar", canvasWidth/2, canvasHeight/2 + 50);
            this.limittime = 130 * 1000;
        }
        ctx.fillStyle = "blue";
            ctx.font = "20px Arial";
            ctx.textAlign = "left";
            ctx.fillText("Bloques rotos: " + this.blockromp, 0, canvasHeight - 10);
        ctx.fillStyle = "red";
            ctx.fillText("vidas: " + this.ball.lives,10, 20);
        ctx.fillStyle = "white";
            ctx.font = "20px Arial";
            ctx.textAlign = "left";
            ctx.fillText("Tiempo restante " + Math.floor(this.limittime/1000), canvasWidth - 250, 15);
        if(this.ball.lives == 10){
            ctx.fillStyle = "red";
            ctx.font = "40px Arial";
            ctx.textAlign = "center";
            ctx.fillText("Presiona espacio para empezar", canvasWidth/2, canvasHeight/2);
        }
        // dos condicionales para cambiar el color de los bloques dependiendo de la cantidad
        if(this.lenp/2 == this.actors.length){
            for(let actor of this.actors){
                actor.color = "red";
                this.re = true;
            }
            this.ball.velocity = 0.5;
        }
        if (Math.floor(this.lenp/4) == this.actors.length){
            for(let actor of this.actors){
                actor.color = "blue";
                
            }
            this.ball.velocity = 0.7;
        }
    }

    // aqui se escuchan todaas las teclas presionadas y soltadas
    createEventListeners() {
        window.addEventListener('keydown', (event) => {
            if (event.key == ' ') {
                if(this.ball.lives == 0 || this.ball.lives == 10){
                    this.ball.directiony = 1;
                    this.ball.directionx =1;
                    this.ball.lives = 3;
                    this.gameOver = false;
                    this.blockromp = 0;
                    for(let actor of this.actors){
                        this.actors.splice(this.actors.indexOf(actor), 1);
                    }
                    this.initObjects();
                    this.spapress = true;
                }
            }
            if (event.key == 'a') {
                this.addKey('left');
            }
             if (event.key == 'd') {
                this.addKey('right');
            }
            if (event.key == 'g') {
                this.ball.velocity = 0.7;
                this.addKey('right');
            }
        });

        window.addEventListener('keyup', (event) => {
            if (event.key == 'a') {
                this.delKey('left');
            } if (event.key == 'd') {
                this.delKey('right');
            }
            if (event.key == 'g') {
                this.ball.velocity = 0.3;
                this.delKey('right');
            }
        });
    }

    addKey(direction) {
        if (!this.player.keys.includes(direction)) {
            this.player.keys.push(direction);
        }
    }

    delKey(direction) {
        if (this.player.keys.includes(direction)) {
            this.player.keys.splice(this.player.keys.indexOf(direction), 1);
        }
    }
}


// Starting function that will be called from the HTML page
function main() {
    // Get a reference to the object with id 'canvas' in the page
    const canvas = document.getElementById('canvas');
    // Resize the element
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    // Get the context for drawing in 2D
    ctx = canvas.getContext('2d');

    // Create the game object
    game = new Game();

    drawScene(0);
}


// Main loop function to be called once per frame
function drawScene(newTime) {
    // Compute the time elapsed since the last frame, in milliseconds
    let deltaTime = newTime-oldTime;

    // Clean the canvas so we can draw everything again
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    game.update(deltaTime);

    game.draw(ctx);

    oldTime = newTime;
    requestAnimationFrame(drawScene);
}