import { CreatureController } from "../controller/creature.controller.js";
export class Population {
  _creatures = new Map();
  _markedList = new Map();

  constructor({ gridMin, gridMax }) {
    this._gridMin = gridMin;
    this._gridMax = gridMax;
  }

  // gridMin
  get gridMin() {
    return this._gridMin;
  }

  // gridMax
  get gridMax() {
    return this._gridMax;
  }

  // get all Creature
  getAllCreatures() {
    return this._creatures;
  }

  // get 1 Creature
  getCreatures(creatureId) {
    return this._creatures.get(creatureId);
  }

  // add 1 Creature
  addCreature(parent = [null, null]) {
    const newCreature = new CreatureController({
      parent: parent,
      gridMin: this._gridMin,
      gridMax: this._gridMax,
      population: this,
    });
    this._creatures.set(newCreature.creature.id, newCreature);
  }

  // populate our Creatures
  populate(populationNumber) {
    for (let i = 0; i < populationNumber; i++) {
      this.addCreature();
    }
  }

  // do a cycle
  makeACycleHandler() {
    this._creatures.forEach((creature, key, map) => {
      creature.act();
    });
  }

  markPosition({ xPos, yPos, creatureId }) {
    this._markedList.set(`${xPos}-${yPos}`, creatureId);
  }

  unmarkPosition({ xPos, yPos }) {
    this._markedList.delete(`${xPos}-${yPos}`);
  }

  getMarker({ xPos, yPos }) {
    return this._markedList.get(`${xPos}-${yPos}`);
  }
}
