import { Creature } from "../models/creature.model.js";

export class CreatureController {
  constructor({ parent = [null, null], gridMin, gridMax, population }) {
    this._creature = new Creature({ parent, gridMin, gridMax });
    this._population = population;
    this.gridMax= gridMax;
    this.gridMin = gridMin;
  }

  // creature
  get creature() {
    return this._creature;
  }

  // make a creature perform its routine
  async act() {
    if (this._creature.isAlive) {
      await this.updateFertility();
      await this.updateDirection();
      await this.move();
      await this.checkReproduction();
      await this.checkDeath();

      return null;
    }
  }

  // recover pregnancy time
  updateFertility() {
    if (this._creature.pregnancyTimer > 0) {
      this._creature.pregnancyTimer -= 1;
    }
  }

  // update the creature's movement preferences
  updateDirection() {
    if (this._creature.xPos === this.gridMax) {
      this._creature.xPull = -1;
    }
    if (this._creature.xPos === this.gridMin) {
      this._creature.xPull = 1;
    }
    if (this._creature.yPos === this.gridMax) {
      this._creature.yPull = -1;
    }
    if (this._creature.yPos === this.gridMin) {
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
    this._creature.xPos = Math.round(
      this._creature.xPos + this._creature.speed * this._creature.xPull
    );
    if (this._creature.xPos > this.gridMax){
      this._creature.xPos = this.gridMax
    }
    if (this._creature.xPos < this.gridMin){
      this._creature.xPos = this.gridMin
    }

    this._creature.yPos = Math.round(
      this._creature.yPos + this._creature.speed * this._creature.yPull
    );
    if (this._creature.yPos > this.gridMax){
      this._creature.yPos = this.gridMax
    }
    if (this._creature.yPos < this.gridMin){
      this._creature.yPos = this.gridMin
    }
  }

  // Fertilize location, possibly spawn child
  async setPregnancyTimer({ markerId, newValue }) {
    const marker = this._population.getCreature(markerId);
    marker._creature.pregnancyTimer = newValue;
  }

  // Fertilize location, possibly spawn child
  async checkReproduction() {
    if (this._creature.pregnancyTimer > 0) return;
    const markerId = await this._population.getMarker({xPos: this._creature.xPos, yPos: this._creature.yPos});

    if (markerId) {
      await this._population.addCreature([this._creature.id, markerId]);
      console.log("Baby born!")

      this._creature.pregnancyTimer = 10;
      await this.setPregnancyTimer({ markerId, newValue: 10 });

      await this._population.unmarkPosition({ xPos: this._creature.xPos, yPos: this._creature.yPos });
    } else {
      await this._population.markPosition({ xPos:this._creature.xPos, yPos: this._creature.yPos, creatureId: this._creature.id});
    }
  }

  // determine if creature dies
  checkDeath() {
    if (Math.random() * 200 < this._creature.age) {
      this._creature.isAlive = false;
    }
  }
}
