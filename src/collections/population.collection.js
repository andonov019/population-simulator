import { CreatureController } from "../controller/creature.controller.js";
export class Population {
  _creatures = new Map();
  _markedList = new Map();
  _currentPopulation = 0;
  _totalPopulation = 0;


  constructor({ gridMin, gridMax, maxAge, reproductionTimer, maxPopulation }) {
    this._gridMin = gridMin;
    this._gridMax = gridMax;
    this._maxAge = maxAge;
    this._reproductionTimer = reproductionTimer;
    this._maxPopulation = maxPopulation;
  }

  // gridMin
  get gridMin() {
    return this._gridMin;
  }

  // gridMax
  get gridMax() {
    return this._gridMax;
  }

  // maxAge
  get maxAge() {
    return this._maxAge;
  }

  get reproductionTimer() {
    return this._reproductionTimer;
  }

  get maxPopulation() {
    return this._maxPopulation;
  }

  // get all Creature
  getAllCreatures() {
    return this._creatures;
  }

  // get 1 Creature
  getCreature(creatureId) {
    return this._creatures.get(creatureId);
  }

  // add 1 Creature
  addCreature({ parent = [null, null], xPos = null, yPos = null, reproductionTimer = null, maxPopulation = null }) {
    const father = parent[0] ? this.getCreature(parent[0]): null;
    const mother = parent[1] ? this.getCreature(parent[1]): null;

    const newCreature = new CreatureController({
      parent: parent,
      gridMin: this._gridMin,
      gridMax: this._gridMax,
      population: this,
      xPos: father ? father.creature.xPos:xPos,
      yPos: father ? father.creature.yPos:yPos,
      speed: /*father ? (((father.creature.speed + mother.creature.speed)/2) * (1 + Math.random())):*/ null,
      xPullChange: /*father ? (((father.creature.xPullChange + mother.creature.xPullChange)/2) * (1 + Math.random())) :*/ null,
      yPullChange: /*father ? (((father.creature.yPullChange + mother.creature.yPullChange)/2) * (1 + Math.random())):*/ null,
      xPull: null,
      yPull: null,
      color: father ? father.creature.color: null,
      reproductionTimer: this.reproductionTimer,
      maxPopulation: this.maxPopulation
    });

    this._creatures.set(newCreature.creature.id, newCreature);
    this._currentPopulation++;
    this._totalPopulation++;

  }

  // populate our Creatures
  populate(populationNumber) {
    for (let i = 0; i < populationNumber; i++) {
      this.addCreature({});
    }
    this._currentPopulation = populationNumber;
    this._totalPopulation = populationNumber;
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

   unmarkAllPositions() {
    this._markedList.clear();
  }

  getMarker({ xPos, yPos }) {
    return this._markedList.get(`${xPos}-${yPos}`);
  }
}
