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
      this.newly_infected.push(randomPerson);
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

  /**
   * Runs the simulation until all requirements for ending the simulation are met.
   * If simulation continues, we call time_step method to compute a time step in the simulation 
   * and infect_newly_infected to add virus object to people infected in the time step.
   */
  run() {
    let time_steps = 0;
    while (this.simulation_should_continue()) {
      this.time_step();
      time_steps += 1;
      this.infect_newly_infected();
    }
    console.log(`The simulation has ended after ${time_steps} turns.`);
  }

  /**
   * Contains all the logic for computing one time step in the simulation.
   * For each infected person there will be 100 random interactions as long as the person is alive
   * and is no the same. 
   */
  time_step() {
    let interaction = 0; 
    for (const id in this.newly_infected) {
      let infected = this.population[id];
      while (interaction <= 100) {
        const randomNum = Math.floor(Math.random() * this.pop_size);
        let randomPerson = this.population[randomNum];
        // if random person is alive & not the same as infected => interaction
        if (randomPerson.is_alive && infected !== randomPerson) {
          this.simulation.interaction(infected, this.population[randomPerson]);
          interaction += 1;
        }
      }
    }
  }

  /**
   * Called any time two living people are selected for an interaction. 
   * If random person becomes infected, their id is then added to newly_infected array. 
   * @param person - The initial infected person.
   * @param random_person - The random person that person(param) interacted with.
   */
  interaction(person, random_person) {
    // random person is vaccinated => nothing happens
    // random person infected already => nothing happens
    // random person gets infected
    const randomNum = Math.random();
    if (randomNum < this.virus.repro_rate) {
      this.newly_infected.push(random_person._id);
    }
  }

  /**
   * Iterates through the list of ids stored in self.newly_infected and updates
   * each Person object with the virus object.
   * @param id - The id of the random person. 
   */
  infect_newly_infected(id) {
    for(const id in this.newly_infected) {
      this.population[id].infection = this.virus;
    }
    // reset to empty array
    this.newly_infected = [];
  }
}

export default Simulation;