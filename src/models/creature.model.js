import { colors } from "../js/colors.js";
export class Creature {
  constructor({ parent, gridMin, gridMax, xPos, yPos }) {
    this._id = Math.random();
    this._xPullChange = this.getRandom(-1, 1, 2);
    this._yPullChange = this.getRandom(-1, 1, 2);
    this._parent = parent;
    this._age = 0;
    this._speed = this.getRandom(1, 0.25 * gridMax, 2);
    this._xPull = this.getRandom(-1, 1, 2);
    this._yPull = this.getRandom(-1, 1, 2);
    this._xPos = xPos || this.getRandom(gridMin, gridMax, 0);
    this._yPos = yPos || this.getRandom(gridMin, gridMax, 0);
    this._pregnancyTimer = 10;
    this._isAlive = true;
    this._color = colors[Math.floor(Math.random() * colors.length)];
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
    if (typeof newXPull === "number" && newXPull >= -1 && newXPull <= 1) {
      this._xPull = newXPull.toFixed(2);
    }
  }

  // yPull
  get yPull() {
    return this._yPull;
  }
  set yPull(newYPull) {
    if (typeof newYPull === "number" && newYPull >= -1 && newYPull <= 1) {
      this._yPull = newYPull.toFixed(2);
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

  // pregnancyTimer
  get pregnancyTimer() {
    return this._pregnancyTimer;
  }
  set pregnancyTimer(newPregnancyTimer) {
    if (typeof newPregnancyTimer === "number" && newPregnancyTimer >= 0) {
      this._pregnancyTimer = newPregnancyTimer.toFixed(0);
    }
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
