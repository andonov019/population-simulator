import { Canvas } from "./js/canvas.js";
import { Population } from "./collections/population.collection.js";

const roundRepeat = 2000;
const canvasSize = 600;
const gridSize = 50;
const maxAge = 2000;
const maxPopulation = 500;
const initialPopulation = 90;
const reproductionTimer = 10;
const timer = (ms) => new Promise((res) => setTimeout(res, ms));

const canvas = new Canvas();
const population = new Population({
  gridMin: -(0.5 * gridSize),
  gridMax: 0.5 * gridSize,
  maxAge: maxAge,
  reproductionTimer: reproductionTimer,
  maxPopulation: maxPopulation
});
population.populate(initialPopulation);
const creatures = population.getAllCreatures();
canvas.updateCanvas(canvasSize, gridSize, Array.from(creatures.values()));

for (let i = 0; i < roundRepeat; i++) {
  creatures.forEach(async (creature) => {
    await creature.act();
  });
  canvas.updateCanvas(canvasSize, gridSize, Array.from(creatures.values()));
  await population.unmarkAllPositions();
  document.getElementById("currentPopulationText").textContent = population._currentPopulation;
  document.getElementById("totalPopulationText").textContent = population._totalPopulation;

  await timer(100);
}
