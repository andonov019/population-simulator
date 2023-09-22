import { CreatureController } from "../controller/creature.controller";
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
  addCreature(parrent = [null, null]) {
    const newCreature = new CreatureController({
      parent: parrent,
      gridMin: this._gridMin,
      gridMax: this._gridMax,
    });
    this._creatures.set(newCreature.id, newCreature);
  }

  // populate our Creatures
  populate(populationNumber) {
    for (let i = 0; i < populationNumber; i++) {
      if (selectObject.options[i].selected) {
        this.addCreature();
      }
    }
  }
}
