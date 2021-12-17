class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    }
    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return vampire.numberOfVampiresFromOriginal > this.numberOfVampiresFromOriginal;
  }
  
  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    let answer = null;
    if (this.name === name) {
      return this;
    }
    for (const id of this.offspring) {
      answer = id.vampireWithName(name);
      if (answer) {
        break;
      }
    }
    return answer;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let totalVampires = 0;
    for (let child of this.offspring) {
      totalVampires += child.totalDescendents + 1;
    }
    return totalVampires;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let list = [];
    if (this.yearConverted > 1980) {
      list.push(this);
    }
    for (const child of this.offspring) {
      const millenial = child.allMillennialVampires;
      list = list.concat(millenial);
    }
    return list;
  }
  
}

module.exports = Vampire;

