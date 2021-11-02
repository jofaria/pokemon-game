class Game {
  // properties
  constructor() {
    this.background = new Image();
    this.background.src = "./images/background_edited.jpeg";
    this.ash = new Ash();
    this.koffingArr = [new Koffing(0)];
    this.pokeballArr = [new Pokeball(0)];
    this.bushArr = [new Bush(0)];
    // this.grassArr = [new Grass(0)];
    this.koffingAppearingDistance = 50;
    this.pokeballAppearingDistance = 900; // works with 900
    this.bushAppearingDistance = 100; // works with 100
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
      let randomYPos = (Math.random() * -canvas.height) / 2;
      let pokeball = new Pokeball(randomYPos);
      this.pokeballArr.push(pokeball);
    }
    // set intervals will work, but it won't be the most efficient way
  };

  spawnBushes = () => {
    let lastInd = this.bushArr.length - 1;
    let lastBush = this.bushArr[lastInd];

    if (lastBush.x === this.bushAppearingDistance) {
      // * get a random number and assign it to yPos
      let randomYPos = (Math.random() * -canvas.height) / 2;
      let bush = new Bush(randomYPos);
      this.bushArr.push(bush);
    }
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

    // ---------- POKEBALLS ----------

    this.pokeballArr.forEach((eachPokeball) => {
      eachPokeball.pokeballMove();
    });

    this.spawnPokeballs();

    // ---------- BUSH ----------

    // this.bushArr.forEach((eachBush) => {
    //   eachBush.bushMove();
    // });
    // this.spawnBushes();

    // ---------- COLLISIONS ----------

    this.koffingArr.forEach((eachKoffing) => {
      if (this.ash.ashKoffingCollision(eachKoffing)) {
        this.gameOver();
      } // returns either true or false
    });

    this.pokeballArr.forEach((eachPokeball, i) => {
      this.ash.ashPokeballCollision(eachPokeball, i);
    });

    this.bushArr.forEach((eachBush, i) => {
      this.ash.ashBushCollision(eachBush, i);
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

    // ---------- BUSH ----------

    if (this.ash.pokeballCollision > 10) {
      this.spawnBushes();

      this.bushArr.forEach((eachBush) => {
        eachBush.bushMove();
      });

      this.bushArr.forEach((eachBush) => {
        eachBush.drawBush();
      });
    }

    // * 4. animation frame and game logic changes

    if (!this.isGameOver) {
      requestAnimationFrame(this.gameLoop);
    }
  };
}
