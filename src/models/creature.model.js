import { colors } from "../js/colors.js";
export class Creature {
  constructor({ parent, gridMin, gridMax, xPos, yPos, speed, xPullChange, yPullChange , xPull, yPull, color, reproductionTimer, maxPopulation}) {
    this._id = Math.random();
    this._xPullChange = xPullChange || this.getRandom(-0.5, 0.5, 10);
    this._yPullChange = yPullChange || this.getRandom(-0.5, 0.5, 10);
    this._parent = parent;
    this._age = 0;
    this._speed = speed || this.getRandom(0.0005 * gridMax, 0.01 * gridMax, 10);
    this._xPull = xPull || this.getRandom(-1, 1, 2);
    this._yPull = yPull || this.getRandom(-1, 1, 2);
    this._xPos = xPos || this.getRandom(gridMin, gridMax, 0);
    this._yPos = yPos || this.getRandom(gridMin, gridMax, 0);
    this._reproductionTimer = reproductionTimer;
    this._maxPopulation = maxPopulation;
    this._isAlive = true;
    //this._color = colors[Math.floor(Math.random() * colors.length)];
    this._color = color || [this.getRandom(0, 255, 0),this.getRandom(0, 255, 0),this.getRandom(0, 255, 0)];

  }

  getRandom(min, max, decimal) {
    const random = Math.random() * (max - min) + min;
    return +random.toFixed(decimal);
  }

  // id
  get id() {
    return this._id;
  }

  // xPullChange
  get xPullChange() {
    return this._xPullChange;
  }

  // color
  get color() {
    return this._color;
  }

  // yPullChange
  get yPullChange() {
    return this._yPullChange;
  }

  // parent
  get parent() {
    return this._parent;
  }

  // age
  get age() {
    return this._age;
  }
  set age(newAge) {
    if (typeof newAge === "number" && newAge >= 0) {
      this._age = newAge;
    }
  }

  // speed
  get speed() {
    return this._speed;
  }
  set speed(newSpeed) {
    if (typeof newSpeed === "number" && newSpeed > 0) {
      this._speed = newSpeed;
    }
  }

  // xPull
  get xPull() {
    return this._xPull;
  }
  set xPull(newXPull) {
    if (typeof newXPull === "number" ) {
      this._xPull = newXPull;
    }
  }

  // yPull
  get yPull() {
    return this._yPull;
  }
  set yPull(newYPull) {
    if (typeof newYPull === "number") {
      this._yPull = newYPull;
    }
  }

  // xPos
  get xPos() {
    return this._xPos;
  }
  set xPos(newXPos) {
    if (typeof newXPos === "number") {
      this._xPos = newXPos;
    }
  }

  // yPos
  get yPos() {
    return this._yPos;
  }
  set yPos(newYPos) {
    if (typeof newYPos === "number") {
      this._yPos = newYPos;
    }
  }

  // reproductionTimer
  get reproductionTimer() {
    return this._reproductionTimer;
  }
  set reproductionTimer(newReproductionTimer) {
    if (typeof newReproductionTimer === "number" && newReproductionTimer >= 0) {
      this._reproductionTimer = newReproductionTimer.toFixed(0);
    }
  }

  // maxPopulation
  get maxPopulation() {
    return this._maxPopulation;
  }

  // isAlive
  get isAlive() {
    return this._isAlive;
  }
  set isAlive(newIsAlive) {
    if (typeof newIsAlive === "boolean") {
      this._isAlive = newIsAlive;
    }
  }
}
