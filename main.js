// * GLOBAL VARIABLES

//  canvas setup
let canvas = document.querySelector("#canvas");

let ctx = canvas.getContext("2d");

// DOM ELEMENTS

let startButton = document.querySelector("#start-btn");
let restartButton = document.querySelector("#restart-btn");
let splashScreen = document.querySelector("#splash-screen");
let gameoverScreen = document.querySelector("#gameover-screen");

// game object
let game;

// * FUNCTIONS

const startGame = () => {
  // hide flash screen
  splashScreen.style.display = "none";

  // show game screen
  canvas.style.display = "flex";
  score.style.display = "flex";
  // start the game
  // we will have a class for the game that when I click the button we will create one element of that class
  game = new Game();

  game.gameLoop();
};

const restartGame = () => {
  gameoverScreen.style.display = "none";
  // show game screen
  canvas.style.display = "flex";
  score.style.display = "flex";

  // game.gameLoop() will not work
  // you will need to create a new instance of the game
  // you might need to restart some default vair
  game = new Game();
  game.gameLoop();
};

// * ADD EVENT LISTENERS

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", restartGame);

window.addEventListener("keydown", (event) => {
  game.ash.ashMove(event);
});
