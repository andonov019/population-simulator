export class Population {
  _creatures = new Map();

  addCreature(newCreature) {
    this._creatures.set(newCreature.id, newCreature);
  }

  getCreatures(creatureId) {
    return this._creatures.get(creatureId);
  }

  getAllCreatures() {
    return this._creatures;
  }
}
