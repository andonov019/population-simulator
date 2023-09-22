class Canvas {
  constructor(size) {
    this.renderCanvas(size);
  }

  renderCanvas(size) {
    const container = document.getElementById("grid-container");

    const cellsToGenerate = 100;

    for (let i = 0; i < cellsToGenerate; i++) {
      const newDiv = document.createElement("div");
      newDiv.classList.add("grid-cell");
      newDiv.textContent = i;
      container.appendChild(newDiv);
    }
  }
}

const canvas = new Canvas([0, 1]);
