import { Canvas } from "./js/canvas.js";
import { Population } from "./collections/population.collection.js";

const roundRepeat = 100;
const canvasSize = 600;
const gridSize = 30;
const maxAge = 200;
const initialPopulation = 40;
const timer = (ms) => new Promise((res) => setTimeout(res, ms));

const canvas = new Canvas();
const population = new Population({
  gridMin: -(0.5 * gridSize),
  gridMax: 0.5 * gridSize,
  maxAge: maxAge
});
population.populate(initialPopulation);
const creatures = population.getAllCreatures();
canvas.updateCanvas(canvasSize, gridSize, Array.from(creatures.values()));

for (let i = 0; i < roundRepeat; i++) {
  creatures.forEach(async (creature) => {
    await creature.act();
  });
  canvas.updateCanvas(canvasSize, gridSize, Array.from(creatures.values()));
  await timer(100);
}
