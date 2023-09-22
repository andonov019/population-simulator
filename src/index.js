import { Canvas } from "./js/canvas.js";
import { Population } from "./collections/population.collection.js";

const canvasSize = 500;
const gridSize = 10;
const initialPopulation = 10;

const canvas = new Canvas();
const population = new Population({ gridMin: -(0.5*gridSize), gridMax: (0.5*gridSize) });
population.populate(initialPopulation);
const creatures = population.getAllCreatures();
canvas.updateCanvas(canvasSize, gridSize, Array.from(creatures.values()));

do {
  const creatures = population.getAllCreatures();
  creatures.forEach(async creature => {
    await creature.act();
    canvas.updateCanvas(canvasSize, gridSize, Array.from(creatures.values()));
  })
} while (false);
