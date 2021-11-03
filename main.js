// * GLOBAL VARIABLES

//  CANVAS

let canvas = document.querySelector("#canvas");

let ctx = canvas.getContext("2d");

// DOM ELEMENTS

let startButton = document.querySelector("#start-btn");
let restartButton = document.querySelector("#restart-btn");
let splashScreen = document.querySelector("#splash-screen");
let gameoverScreen = document.querySelector("#gameover-screen");
let winGameScreen = document.querySelector("#win-game-screen");
let playAgainBtn = document.querySelector("#play-again-btn");

// GAME OBJECTS
let game;

// * FUNCTIONS

const startGame = () => {
  // hide flash screen
  splashScreen.style.display = "none";

  // show game screen
  canvas.style.display = "flex";
  score.style.display = "flex";

  // start the game
  game = new Game();
  game.gameLoop();
};

const restartGame = () => {
  gameoverScreen.style.display = "none";

  // show game screen
  canvas.style.display = "flex";
  score.style.display = "flex";

  game = new Game();

  game.gameLoop();
};

const playAgain = () => {
  winGameScreen.style.display = "none";

  canvas.style.display = "flex";
  score.style.display = "flex";

  game = new Game();
  // game.winGameMusic.pause();
  game.gameLoop();
};

// * ADD EVENT LISTENERS

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", restartGame);
playAgainBtn.addEventListener("click", playAgain);

window.addEventListener("keydown", (event) => {
  game.ash.ashMove(event);
});
