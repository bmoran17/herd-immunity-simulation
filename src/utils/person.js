/** Class representing a person. */
class Person {
  /**
   * 
   * @param _id - The id of the person.
   * @param is_vaccinated - Boolean value for person's vaccination status. 
   * @param infection - The virus object.
   */
  constructor(_id, is_vaccinated, infection = null) {
    this._id = _id;
    this.is_alive = true;
    this.is_vaccinated = is_vaccinated;
    this.infection = infection;
  }

  /**
   * Generates a random number and compares to virus's mortality_rate.
   * If random number is smaller, person dies from the disease.
   * If Person survives, they become vaccinated and they have no infection.
   * @returns {Boolean} - If the person survived the infection.
   */
  did_survive_infection() {
    // Only called if infection attribute is not none
    if (this.infection) {
      const randomNum = Math.random();
      const mortality_rate = this.infection.mortality_rate;
      if (randomNum < mortality_rate) {
        this.is_alive = false;
        return false;
      }
      this.is_vaccinated = true;
      this.infection = null;
      return true;
    }
  }
}

export default Person;
