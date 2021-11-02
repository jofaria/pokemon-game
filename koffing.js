class Koffing {
  // properties
  constructor(yPos) {
    this.image = new Image();
    this.image.src = "./images/single-koffing.png"; // original size: 108 × 112
    this.width = 60;
    this.height = 62;
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
