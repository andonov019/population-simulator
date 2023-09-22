import { v4 as uuidv4 } from "uuid";
import randomName from "random-name";

export class Creature {
  constructor({ parent = [null, null], gridMin, gridMax }) {
    this._id = uuidv4();
    this._xPullChange = this.getRandom(0, 1, 2);
    this._yPullChange = this.getRandom(0, 1, 2);
    this._name = randomName.first();
    this._parent = parent;
    this._age = 0;
    this._speed = this.getRandom(1, 0.25 * gridMax, 2);
    this._xPull = this.getRandom(-1, 1, 2);
    this._yPull = this.getRandom(-1, 1, 2);
    this._xPos = this.getRandom(gridMin, gridMax, 0);
    this._yPos = this.getRandom(gridMin, gridMax, 0);
    this._pregnancyTimer = 10;
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

  // yPullChange
  get yPullChange() {
    return this._yPullChange;
  }

  // name
  get name() {
    return this._name;
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
    if (typeof newXPull === "number" && newXPull >= 0 && newXPull <= 1) {
      this._xPull = newXPull.toFixed(2);
    }
  }

  // yPull
  get yPull() {
    return this._yPull;
  }
  set yPull(newYPull) {
    if (typeof newYPull === "number" && newYPull >= 0 && newYPull <= 1) {
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
}
