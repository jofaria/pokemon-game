class Koffing {
  // properties
  constructor(yPos) {
    this.image = new Image();
    this.image.src = "./images/only-smoke-koffing.gif"; // original size: 96x96
    this.width = 96;
    this.height = 96;
    this.x = canvas.width;
    this.y = yPos + 500;
  }

  // methods

  drawKoffing = () => {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  };

  koffingMove = () => {
    this.x -= 5;
  };
}
