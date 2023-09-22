import { Canvas } from "./js/canvas.js";
import { Population } from "./collections/population.collection.js";

const canvas = new Canvas(500, 10);
const population = new Population({ gridMin: 0, gridMax: 10 });
