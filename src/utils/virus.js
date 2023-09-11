/** Class representing a virus. */
class Virus {
  /**
   * Create a virus.
   * @param name - The name of the virus.
   * @param repro_rate The reproductive rate of the virus. 
   * @param mortality_rate The mortality rate of the virus.
   */
  constructor(name, repro_rate, mortality_rate) {
    this.name = name;
    this.repro_rate = repro_rate;
    this.mortality_rate = mortality_rate;
  }
}

export default Virus;