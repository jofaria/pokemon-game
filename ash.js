class Ash {
  // ----------------------------------- PROPERTIES -----------------------------------
  constructor() {
    this.ashImage = new Image();
    this.ashImage.src = "./images/just-ash.gif"; // original size: 129 x 166
    this.width = 51.6; // 40% smaller
    this.height = 66.4;
    this.x = canvas.width / 5;
    this.y = canvas.height - 200;
    this.ashSpeed = 30;
    this.pokeballCollision = 0;
    this.bushCollision = 0;
  }

  // ----------------------------------- METHODS -----------------------------------

  drawAsh = () => {
    ctx.drawImage(this.ashImage, this.x, this.y, this.width, this.height);
  };

  ashMove = (event) => {
    let buttonBeingClicked = event.code;

    if (buttonBeingClicked === "ArrowUp") {
      this.y -= this.ashSpeed;
    } else if (buttonBeingClicked === "ArrowDown") {
      if (this.y + 100 < canvas.height) {
        this.y += this.ashSpeed;
      }
    } else if (buttonBeingClicked === "ArrowRight") {
      this.x += this.ashSpeed;
    } else if (buttonBeingClicked === "ArrowLeft") {
      if (this.x - 20 > 0) {
        this.x -= this.ashSpeed;
      }
    }
  };

  // * Collisions

  ashWallCollision = () => {
    if (this.x + 50 > canvas.width) {
      return true;
    } // collision with water
    else if (this.y < canvas.height - 400) {
      return true;
    }
  };

  ashPokeballCollision = (singlePokeball, index) => {
    if (
      this.x < singlePokeball.x + singlePokeball.width &&
      this.x + this.width > singlePokeball.x &&
      this.y < singlePokeball.y + singlePokeball.height &&
      this.height + this.y > singlePokeball.y
    ) {
      game.pokeballArr.splice(index, 1);
      this.pokeballCollision++;
    }
  };

  ashKoffingCollision = (singleKoffing) => {
    if (
      this.x < singleKoffing.x + singleKoffing.width &&
      this.x + this.width > singleKoffing.x &&
      this.y < singleKoffing.y + singleKoffing.height &&
      this.height + this.y > singleKoffing.y
    ) {
      return true;
    } else {
      return false;
    }
  };

  ashBushCollision = (singleBush) => {
    if (
      this.x < singleBush.x + singleBush.width &&
      this.x + this.width > singleBush.x &&
      this.y < singleBush.y + singleBush.height &&
      this.height + this.y > singleBush.y
    ) {
      this.bushCollision++;
    }
  };
}

// ** ALTERNATIVE LOGIC: game ends when ash falls off the background
/*

  ashMove = (event) => {
    let buttonBeingClicked = event.code;

    if (buttonBeingClicked === "ArrowUp") {
      this.y -= this.ashSpeed;
    } else if (buttonBeingClicked === "ArrowDown") {
      this.y += this.ashSpeed;
    } else if (buttonBeingClicked === "ArrowRight") {
      this.x += this.ashSpeed;
    } else if (buttonBeingClicked === "ArrowLeft") {
      this.x -= this.ashSpeed;
    }
  };

  ashWallCollision = () => {
    // collision with floor
    if (this.y + 40 > canvas.height) {
      return true;
    } // collision with left wall
    else if (this.x + 30 < 0) {
      return true;
    } // collision with right wall
    else if (this.x + 50 > canvas.width) {
      return true;
    } // collision with water
    else if (this.y < canvas.height - 400) {
      return true;
    }
  };
  */
