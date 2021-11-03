class Pokeball {
  // properties
  constructor(yPos) {
    this.image = new Image();
    this.image.src = "./images/spinning-pokeball.gif"; // original size: 410 × 386
    this.width = 25;
    this.height = 23;
    this.x = canvas.width;
    this.y = yPos + 550;
    // -> 500 works but there's a gap at the bottom and some pokeballs are almost in the water
  }

  // methods

  drawPokeball = () => {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  };

  pokeballMove = () => {
    this.x -= 2;
  };
}
