class Pokeball {
  // properties
  constructor(yPos) {
    this.image = new Image();
    this.image.src = "./images/spinning-pokeball.gif"; // original size: 410 × 386
    this.width = 32.8;
    this.height = 30.8;
    this.x = canvas.width;
    this.y = yPos + 550;
    // -> 500 works well but there's a gap at the bottom and some pokeballs are almost in the water
    // -> 550 works but it's close at the bottom and there's a big gap at the top
  }

  // methods

  drawPokeball = () => {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  };

  pokeballMove = () => {
    this.x -= 2;
  };
}
