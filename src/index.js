import { Canvas } from "./js/canvas.js";
import { Population } from "./collections/population.collection.js";

const canvasSize = 500;
const gridSize = 10;
const initialPopulation = 10;

const canvas = new Canvas(canvasSize, gridSize);
const population = new Population({ gridMin: -(0.5*gridSize), gridMax: (0.5*gridSize) });
population.populate(initialPopulation);
const creatures = population.getAllCreatures();
canvas.updateCanvas(canvasSize, gridSize, Array.from(creatures.values()));

do {
  await population.makeACycleHandler();
  canvas.updateCanvas(Array.from(creatures.values()));
} while (true);
