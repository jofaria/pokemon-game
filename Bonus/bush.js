class Bush {
  // properties
  constructor(yPos) {
    this.image = new Image();
    this.image.src = "../images/bush-no-background.png"; // original size: 602 × 414
    this.width = 60.2;
    this.height = 41.4;
    this.x = canvas.width;
    this.y = yPos + 550; // works with 500 as well
  }

  // methods

  drawBush = () => {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  };

  bushMove = () => {
    this.x -= 6;
  };
}
