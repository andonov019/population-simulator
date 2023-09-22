export class Canvas {
  constructor(cellSlots) {
    this.renderCanvas(cellSlots);
  }

  renderCanvas(cellsToGenerate) {
    const container = document.getElementById("grid-container");

    for (let i = 0; i < cellsToGenerate; i++) {
      const newDiv = document.createElement("div");
      newDiv.classList.add("grid-cell");
      newDiv.textContent = i;
      container.appendChild(newDiv);
    }
  }
}
