import { Creature } from "../models/creature.model.js";

export class CreatureController {
  constructor({
    parent = [null, null],
    gridMin,
    gridMax,
    population,
    xPos,
    yPos, speed, xPullChange, yPullChange , xPull, yPull, reproductionTimer
  }) {
    this._creature = new Creature({ parent, gridMin, gridMax, xPos, yPos, speed, yPullChange,xPullChange, xPull, yPull, reproductionTimer });
    this._population = population;
    this.gridMax = gridMax;
    this.gridMin = gridMin;
    this.reproductionTimer = reproductionTimer;
  }

  // creature
  get creature() {
    return this._creature;
  }

  // make a creature perform its routine
  async act() {
    if (this._creature.isAlive) {
      this.updateFertility();
      this.updateDirection();
      this.move();
      await this.checkReproduction();
      this.checkDeath();
      this._creature.age++;
    }
  }

  // recover pregnancy time
  updateFertility() {
    if (this._creature.reproductionTimer > 0) {
      this._creature.reproductionTimer -= 1;
    }
  }

  // update the creature's movement preferences
  updateDirection() {
    if (this._creature.xPos >= this.gridMax) {
      this._creature.xPull = -1;
    }
    if (this._creature.xPos <= this.gridMin) {
      this._creature.xPull = 1;
    }
    if (this._creature.yPos >= this.gridMax) {
      this._creature.yPull = -1;
    }
    if (this._creature.yPos <= this.gridMin) {
      this._creature.yPull = 1;
    }
    this._creature.xPull =
      (Math.random() - 0.5) * 0.25 * this._creature.xPullChange +
      this._creature.xPullChange +
      this._creature.xPull;
    this._creature.yPull =
      (Math.random() - 0.5) * 0.25 * this._creature.yPullChange +
      this._creature.yPullChange +
      this._creature.yPull;

    if (this._creature.xPull > 1) {
      this._creature.xPull = 1;
    }
    if (this._creature.xPull < -1) {
      this._creature.xPull = -1;
    }
    if (this._creature.yPull > 1) {
      this._creature.yPull = 1;
    }
    if (this._creature.yPull < -1) {
      this._creature.yPull = -1;
    }
  }

  //perform the creature's movement according to it's preferences and speed
  move() {

    this._creature.xPos = this._creature.xPos +
        Math.ceil(this._creature.speed * this._creature.xPull);

    if (this._creature.xPos > this.gridMax) {
      this._creature.xPos = this.gridMax;
    }
    if (this._creature.xPos < this.gridMin) {
      this._creature.xPos = this.gridMin;
    }

    this._creature.yPos = this._creature.yPos +
        Math.ceil(this._creature.speed * this._creature.yPull);

    if (this._creature.yPos > this.gridMax) {
      this._creature.yPos = this.gridMax;
    }
    if (this._creature.yPos < this.gridMin) {
      this._creature.yPos = this.gridMin;
    }
  }

  // Fertilize location, possibly spawn child
  async setReproductionTimer({ markerId, newValue }) {
    const marker = this._population.getCreature(markerId);
    marker._creature.reproductionTimer = newValue;
  }

  // Fertilize location, possibly spawn child
  async checkReproduction() {
    if (this._creature.reproductionTimer > 0) return;
    const markerId = await this._population.getMarker({
      xPos: this._creature.xPos,
      yPos: this._creature.yPos,
    });

    if (markerId && (markerId != this._creature.id)) {
      await this._population.addCreature({
        parent: [this._creature.id, markerId],
        xPos: null,
        yPos: null,
      });
      this._creature.reproductionTimer = this.reproductionTimer;
      await this.setReproductionTimer({ markerId, newValue: 5 });

      await this._population.unmarkPosition({
        xPos: this._creature.xPos,
        yPos: this._creature.yPos,
      });
    } else {
      await this._population.markPosition({
        xPos: this._creature.xPos,
        yPos: this._creature.yPos,
        creatureId: this._creature.id,
      });
    }
  }

  // determine if creature dies
  checkDeath() {
    if (Math.random() * this._population.maxAge < this._creature.age) {
      this._creature.isAlive = false;
      this._population._currentPopulation--;
    }
  }
}
