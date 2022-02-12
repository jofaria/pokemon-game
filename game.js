class Game {
  // ----------------------------------- PROPERTIES -----------------------------------

  constructor() {
    this.background = new Image();
    this.background.src = "./images/background_edited.jpeg";
    this.ash = new Ash();
    this.koffingArr = [new Koffing(0)];
    this.pokeballArr = [new Pokeball(0)];
    this.bushArr = [new Bush(0)];
    this.koffingAppearingDistance = 50;
    this.pokeballAppearingDistance = 900;
    this.bushAppearingDistance = 100;
    this.isGameOver = false;
    this.scoreSpan = document.querySelector("#score-span");
    this.gameMusic = new Audio("./Bonus/audio/game-music.mp3");
    this.gameoverMusic = new Audio("./Bonus/audio/lost.mov");
    this.winGameMusic = new Audio("./Bonus/audio/win.mov");
    this.highScoreSound = new Audio("./Bonus/audio/win-sound1.mp3");
  }

  // ----------------------------------- METHODS -----------------------------------

  // GAME OVER FUNCTION

  gameOver = () => {
    // stop the game
    this.isGameOver = true;

    // hide canvas
    canvas.style.display = "none";

    // show restart page
    gameoverScreen.style.display = "flex";
    this.gameoverMusic.play();
  };

  // WIN GAME FUNCTION

  winGame = () => {
    // stop the game
    this.isGameOver = true;

    // hide canvas
    canvas.style.display = "none";

    // show restart page
    winGameScreen.style.display = "flex";
    this.winGameMusic.play();
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

    // ---------- COLLISIONS ----------

    this.koffingArr.forEach((eachKoffing) => {
      if (this.ash.ashKoffingCollision(eachKoffing)) {
        this.gameOver();
      }
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

    // * 4. animation frame and game logic changes

    // ---------- HIGH SCORE SOUND ----------

    if (
      this.ash.pokeballCollision !== 0 &&
      this.ash.pokeballCollision % 10 === 0
    ) {
      this.highScoreSound.play();
    }

    // ---------- SPAWN BUSHES ----------

    if (this.ash.pokeballCollision > 24) {
      this.background.src = "./images/almost-winning.jpg";
      // 20
      this.spawnBushes();

      this.bushArr.forEach((eachBush) => {
        eachBush.bushMove();
      });

      this.bushArr.forEach((eachBush) => {
        eachBush.drawBush();
      });
    }

    // ---------- WINNING GAME ----------

    if (this.ash.bushCollision > 75) {
      this.winGame();
    }

    // ---------- GAME LOOP AND MUSIC ----------

    if (!this.isGameOver) {
      requestAnimationFrame(this.gameLoop);
      this.gameMusic.play();
    } else {
      this.gameMusic.pause();
    }
  };
}
