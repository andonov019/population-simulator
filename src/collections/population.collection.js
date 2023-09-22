import { CreatureController } from "../controller/creature.controller.js";
export class Population {
  _creatures = new Map();

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
}
