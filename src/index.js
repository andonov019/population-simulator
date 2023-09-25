import { Canvas } from "./js/canvas.js";
import { Population } from "./collections/population.collection.js";

const startButton = document.getElementById("startButton")

var roundRepeat = document.getElementById("roundRepeat").value;
var canvasSize = document.getElementById("canvasSize").value;
var gridSize = document.getElementById("gridSize").value;
var maxAge = document.getElementById("maxAge").value;
var maxPopulation = document.getElementById("maxPopulation").value;
var initialPopulation = document.getElementById("initialPopulation").value;
var reproductionTimer = document.getElementById("reproductionTimer").value;
const timer = (ms) => new Promise((res) => setTimeout(res, ms));

const canvas = new Canvas();
const population = new Population({
  gridMin: -(0.5 * gridSize),
  gridMax: 0.5 * gridSize,
  maxAge: maxAge,
  reproductionTimer: reproductionTimer,
  maxPopulation: maxPopulation
});


startButton.addEventListener("click",function(e) {
  e.preventDefault()
  roundRepeat = document.getElementById("roundRepeat").value;
  canvasSize = document.getElementById("canvasSize").value;
  gridSize = document.getElementById("gridSize").value;
  maxAge = document.getElementById("maxAge").value;
  maxPopulation = document.getElementById("maxPopulation").value;
  initialPopulation = document.getElementById("initialPopulation").value;
  reproductionTimer = document.getElementById("reproductionTimer").value;
  population.populate(initialPopulation);
});
population.populate(initialPopulation);

const creatures = population.getAllCreatures();

canvas.updateCanvas(canvasSize, gridSize, Array.from(creatures.values()));

for (let i = 0; i < roundRepeat; i++) {
  creatures.forEach(async (creature) => {
    await creature.act();
  });
  canvas.updateCanvas(canvasSize, gridSize, Array.from(creatures.values()));
  population.unmarkAllPositions();
  document.getElementById("currentPopulationText").textContent = population._currentPopulation;
  document.getElementById("totalPopulationText").textContent = population._totalPopulation;

  await timer(100);

}


myFunction()
{
  console.log(document.getElementById("roundRepeat").value);
  //roundRepeat = document.getElementById("roundRepeat").value;
  //initialPopulation = document.getElementById("initialPopulation").value;

}
