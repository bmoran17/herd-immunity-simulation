import Person from "src/utils/person";
import generateRandomnArray from "src/utils/generateRandomArray";

/** Class representing a simulation. */

class Simulation {
  /**
   * 
   * @param {*} pop_size - The population size.
   * @param {*} vacc_percentage - The percentage of population vaccinated.
   * @param {*} initial_infected - The percentage of population vaccinated. 
   * @param {*} virus - The virus object.
   */
  constructor(pop_size, vacc_percentage, initial_infected, virus) {
    this.pop_size = pop_size;
    this.vacc_percentage = vacc_percentage;
    this.initial_infected = initial_infected;
    this.virus = virus;
    
    this.population = this.create_population(this.initial_infected);
    this.newly_infected = [];
  }

  /**
   * Creates the initial population.
   * @param initial_infected - The number of infected people that the simulation will begin with.
   * @return A list of Person objects.
   */
  
  create_population(initial_infected = 0) {
    // population array with person objects
    let pop = [];  
    for (let i = 0; i < this.pop_size; i++) {
      pop.push(new Person(i, false))
    }

    const initial_vacc = Math.ceil(this.pop_size * this.vacc_percentage);
    // Array for infected & vaccinated people
    const randomPeopleIds = generateRandomnArray((this.initial_infected + initial_vacc),this.pop_size);

    // infect people in population
    for (let i = 0; i < this.initial_infected; i++) {
      const randomPerson = randomPeopleIds[i]; 
      pop[randomPerson].infection = this.virus;
    }

    // vaccinate people
    for (let i = this.initial_infected; i < randomPeopleIds.length; i++) {
      const randomPerson = randomPeopleIds[i];
      pop[randomPerson].is_vaccinated = true; 
    }

    return pop;
  }

  /**
   * The simulation should only end if the entire population is dead or everyone is vaccinated.
   * @return {boolean} - If simulation should continue. 
   */
  simulation_should_continue() {
    for (const person in this.population) {
      if (person.is_alive && !person.is_vaccinated) {
        return true;
      }
    }
    return false;
  }

  run() {

  }

  time_step() {

  }

  interaction() {

  }
}

export default Simulation;