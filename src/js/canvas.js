export class Canvas {

  constructor(size, boxes) {
    this.renderCanvas(size, boxes);

    this.fertilityGrid = new Array(boxes);
    for (var i = 0; i < this.fertilityGrid.length; i++) {
      this.fertilityGrid[i] = new Array(boxes);
    }

  }

  markFertility(creatureId, xPos, yPos){
    this.fertilityGrid[xPos][yPos] = creatureId;
  }

  unmarkFertility(xPos, yPos){
    this.fertilityGrid[xPos][yPos] = null;
  }

  getFertility(xPos, yPos){
    return this.fertilityGrid[xPos][yPos];
  }

  renderCanvas(size, boxes) {
    const canvas = document.getElementById("grid-container");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    const boxSize = size / (boxes + 1) -1;

    for (let i = 0.5*boxes; i >= -0.5*boxes; i--)
      for (let j = -0.5*boxes; j <= 0.5*boxes; j++)  {

        let x =  (0.5 * size - 0.5 * boxSize) + (size / (boxes + 1) * i);
        let y =  (0.5 * size - 0.5 * boxSize) + (size / (boxes + 1) * j);

        ctx.fillStyle = "#cccccc";
        ctx.fillRect(x, y, boxSize, boxSize);
        ctx.font = "8px Comic Sans MS";
        ctx.fillStyle = "black";
        ctx.fillText(i + "|" + j, x, y+8);

    }
  }
}
