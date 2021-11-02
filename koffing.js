class Koffing {
  // properties
  constructor(yPos) {
    this.image = new Image();
    this.image.src = "./images/single-koffing.png"; // original size: 55x45
    this.width = 55;
    this.height = 45;
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
