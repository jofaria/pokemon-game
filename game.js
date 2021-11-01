class Game {
  // properties
  constructor() {
    this.background = new Image();
    this.background.src = "./images/background_edited.jpeg";
    this.ash = new Ash();
    this.koffingArr = [new Koffing(0)];
    this.pokeballArr = [new Pokeball(0)];
    this.koffingAppearingDistance = 50;
    this.pokeballAppearingDistance = 900;
    this.isGameOver = false;
    this.scoreSpan = document.querySelector("#score-span");
  }

  // methods
  gameOver = () => {
    // stop the game
    this.isGameOver = true;

    // hide canvas
    canvas.style.display = "none";

    // show restart page
    gameoverScreen.style.display = "flex";
  };

  spawnKoffings = () => {
    let lastInd = this.koffingArr.length - 1;
    let lastKoffing = this.koffingArr[lastInd];

    if (lastKoffing.x === this.koffingAppearingDistance) {
      // * get a random number and assign it to yPos
      let randomYPos = (Math.random() * -canvas.height) / 2; // + 400;
      let koffing = new Koffing(randomYPos);
      this.koffingArr.push(koffing);
    }
    // set intervals will work, but it won't be the most efficient way
  };

  spawnPokeballs = () => {
    let lastInd = this.pokeballArr.length - 1;
    let lastPokeball = this.pokeballArr[lastInd];

    if (lastPokeball.x === this.pokeballAppearingDistance) {
      // * get a random number and assign it to yPos
      let randomYPos = (Math.random() * -canvas.height) / 2; // + 400;
      let pokeball = new Pokeball(randomYPos);
      this.pokeballArr.push(pokeball);
    }
    // set intervals will work, but it won't be the most efficient way
  };

  increaseScore = () => {
    this.scoreSpan.innerText = this.ash.pokeballCollision;
  };

  gameLoop = () => {
    // * 1. clear the canvas

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // * 2. movement and changes on elements

    this.increaseScore();

    if (this.ash.ashWallCollision()) {
      this.gameOver();
    }

    // ---------- KOFFINGS ----------

    this.koffingArr.forEach((eachKoffing) => {
      eachKoffing.koffingMove();
    });
    this.spawnKoffings();
    this.spawnKoffings();

    this.pokeballArr.forEach((eachPokeball) => {
      eachPokeball.pokeballMove();
    });

    // ---------- POKEBALLS ----------

    this.spawnPokeballs();
    // looping through each koffing and checking for collision
    this.koffingArr.forEach((eachKoffing) => {
      if (this.ash.ashKoffingCollision(eachKoffing)) {
        this.gameOver();
      } // returns either true or false
    });

    this.pokeballArr.forEach((eachPokeball, i) => {
      this.ash.ashPokeballCollision(eachPokeball, i);
    });

    // * 3. drawing the elements

    ctx.drawImage(this.background, 0, 0, canvas.width, canvas.height);
    this.ash.drawAsh();
    this.pokeballArr.forEach((eachPokeball) => {
      eachPokeball.drawPokeball();
    });
    this.koffingArr.forEach((eachKoffing) => {
      eachKoffing.drawKoffing();
    });
    // * 4. animation frame and game logic changes

    if (!this.isGameOver) {
      requestAnimationFrame(this.gameLoop);
    }
  };
}
