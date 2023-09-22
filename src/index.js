import { Canvas } from "./js/canvas.js";
import { Population } from "./collections/population.collection.js";

const initialPopulation = 10;
const canvas = new Canvas(500, 10);
const population = new Population({ gridMin: 0, gridMax: 10 });
population.populate(initialPopulation);
const creatures = population.getAllCreatures();
canvas.updateCanvas(Array.from(creatures.values()));

do {
  await population.makeACycleHandler();
  canvas.updateCanvas(Array.from(creatures.values()));
} while (true);
