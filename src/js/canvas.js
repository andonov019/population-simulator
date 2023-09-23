export class Canvas {
  updateCanvas(size, boxes, allCreatures) {
    this.renderCanvas(size, boxes, allCreatures);
  }

  renderCanvas(size, boxes, allCreatures) {
    const canvas = document.getElementById("grid-container");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    const boxSize = size / (boxes + 1);

    for (let i = 0.5 * boxes; i >= -0.5 * boxes; i--) {
      for (let j = -0.5 * boxes; j <= 0.5 * boxes; j++) {
        let x = 0.5 * size - 0.5 * boxSize + (size / (boxes + 1)) * i;
        let y = 0.5 * size - 0.5 * boxSize + (size / (boxes + 1)) * j;

        ctx.fillStyle = "#cccccc";
        ctx.fillRect(x, y, boxSize, boxSize);
/*        ctx.font = "8px Comic Sans MS";
        ctx.fillStyle = "black";
        ctx.fillText(i + "|" + j, x, y + 8);*/
      }
    }
    allCreatures.forEach((creature) => {
      if(!creature.creature.isAlive) return;

      let x = 0.5 * size + (size / (boxes + 1)) * creature.creature.xPos;
      let y = 0.5 * size + (size / (boxes + 1)) * creature.creature.yPos;
      ctx.beginPath();
      ctx.arc(x, y, boxSize/2, 0, 2 * Math.PI, false);
      ctx.fillStyle = `rgb(${creature.creature.color[0]}, ${creature.creature.color[1]}, ${creature.creature.color[2]})`;
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#003300";
      ctx.stroke();
    });
  }
}
