import { Canvas } from "./js/canvas.js";
import { Population } from "./collections/population.collection.js";

const roundRepeat = 50;
const canvasSize = 500;
const gridSize = 10;
const initialPopulation = 10;
const timer = (ms) => new Promise((res) => setTimeout(res, ms));

const canvas = new Canvas();
const population = new Population({
  gridMin: -(0.5 * gridSize),
  gridMax: 0.5 * gridSize,
});
population.populate(initialPopulation);
const creatures = population.getAllCreatures();
canvas.updateCanvas(canvasSize, gridSize, Array.from(creatures.values()));

for (let i = 0; i < roundRepeat; i++) {
  creatures.forEach(async (creature) => {
    await creature.act();
  });
  canvas.updateCanvas(canvasSize, gridSize, Array.from(creatures.values()));
  await timer(200);
}
