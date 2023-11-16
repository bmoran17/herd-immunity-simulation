import Person from "src/utils/person";
import generateRandomnArray from "src/utils/generateRandomArray";

/** Class representing a simulation. */
class Simulation {
  /**
   * @param {number} pop_size - The population size.
   * @param {number} vacc_percentage - The percentage of population vaccinated.
   * @param {number} initial_infected - The percentage of population vaccinated. 
   * @param {object} virus - The virus object.
   * @param {number} total_interactions - The total interactions every infected person will complete.
   */
  constructor(pop_size, vacc_percentage, initial_infected=0, virus, total_interactions) {
    this.pop_size = pop_size;
    this.vacc_percentage = vacc_percentage;
    this.initial_infected = initial_infected;
    this.virus = virus;
    this.total_interactions = total_interactions;
    this.newly_infected = [];
    this.current_infected = [];
    this.population = this.create_population();
  }

/**
 * It filters through population for people who can still get sick.  
 * @param {number} id - The id of the current person infected.
 * @returns {array} - People who are not vaccinated and infected.
 */
  getAlivePeople(id) {
    return this.population.filter((person) => person.is_alive && id !== person._id && !person.is_vaccinated && !person.infection);
  }

  /**
   * Creates the initial population.
   * People are randomly chosen to be initially sick and vaccinated according to given parameters.
   * Infected people's ids are added to current_infected empty array.
   * @return {array} pop - A list of Person objects.
   */
  
  create_population() {
    // create people objects
    let pop = [];  
    for (let i = 0; i < this.pop_size; i++) {
      pop.push(new Person(i, false))
    }

    // calculate initial vaccination rate
    const initial_vacc = Math.ceil(this.pop_size * this.vacc_percentage);
    const randomPeopleIds = generateRandomnArray((this.initial_infected + initial_vacc),this.pop_size);

    // infect people
    for (let i = 0; i < this.initial_infected; i++) {
      const random_person = randomPeopleIds[i]; 
      pop[random_person].infection = this.virus;
      this.current_infected.push(randomPeopleIds[i]);
    }

    // vaccinate people
    for (let i = this.initial_infected; i < randomPeopleIds.length; i++) {
      const random_person = randomPeopleIds[i];
      pop[random_person].is_vaccinated = true; 
    }

    return pop;
  }

  /**
   * The simulation should only end if the entire population is dead, everyone is vaccinated, or the virus died. 
   * @return {boolean} - If simulation should continue. 
   */
  simulation_should_continue() {
    // end simulation if no more infected people
    if (this.current_infected.length === 0) {
      return false;
    }

    for (let i = 0; i < this.pop_size; i++) {
      const person = this.population[i];
      // continue if there's someone alive healthy unvaccinated
      if (person.is_alive && !person.is_vaccinated) {
        return true;
      }
    }
    // all vaccinated/dead
    return false;
  }

  /** 
   * Runs the simulation until simulation_should_continue is false, which then console logs end message.
   * If simulation continues, we add to our time step counter and 
   * call the methods: time_step, kill_or_vaccinate_, infect_newly_infected.
   */
  run() {
    let time_steps = 0;
    while (this.simulation_should_continue()) {
      this.time_step();
      time_steps += 1;
      this.kill_or_vaccinate();
      this.infect_newly_infected();
    }
    console.log("still sick", this.population.filter((person) => person.infected))
    console.log(`The simulation has ended after ${time_steps} turns.`);
  }

  /**
   * It provides us randomly selected people we can interact with. 
   * @param {array} alive - People who are alive and not vaccinated.
   * @param {number} count - The amount of people we want from the alive array (interactions needed).
   * @returns {array} sample - Ids of people who can get sick.
   */
  interaction_sample (alive, count) {
    let sample = [];
    let counter = 0;

    while (counter < count) {
      const random_num = Math.floor(Math.random() * alive.length);
      const alive_person= alive[random_num];
      // checks sample array to see if alive person is not in array
      if (!sample.some(person =>  person === alive_person)) {
        sample.push(alive_person._id);
        counter += 1
      }
    }
    return sample;
  }

  /**
   * Each infected person is passed to the getter method getAlivePeople to generate a list of people that can still get infected.
   * If healthy people is less than the total interactions, the infected person interacts will all healthy people. 
   * If healthy people is more than the total interactions, we generate an array with the amount needed then infected
   * person interacts with each one. 
   */
  time_step() {
    this.current_infected.forEach((infected) => {
      // list of people that can get infected
      let healthy_people = this.getAlivePeople(infected);
      // if less than total interactions needed => interact with all
      if (healthy_people.length <= this.total_interactions) {
        for (let i = 0; i < healthy_people.length; i++) {
          const healthy_person = healthy_people[i];
          // check that person was not previously interact and infected during same timestep
          if (this.newly_infected.indexOf(healthy_person._id) === -1) {
            this.interaction(healthy_person._id);
          } 
        }
      } else {
        // get interaction sample with method interaction_sample
        const interactions = this.interaction_sample(healthy_people, this.total_interactions);
        interactions.forEach((rand_healthy_person_id) => {
          // if random person is not already in newly_infected => interaction
          if (this.newly_infected.indexOf(rand_healthy_person_id) === -1) {
            this.interaction(rand_healthy_person_id);
          }  
        })
      }
    })
  }

  /**
   * @param id - The healthy unvaccinated person's id that interacted with the infected person.
   * Called any time an infected person interacts with a healthy unvaccinated person. 
   * If random person becomes infected, their id is then added to newly_infected array. 
   */
  interaction(id) {
    const random_num = Math.random();
    if (random_num < this.virus.repro_rate) {
      this.newly_infected.push(id);
    }
  }

  /**
   * Iterates through the list of ids stored in newly_infected and updates
   * each Person object with the virus object.
   * Newly_infected is set to current_infected and then to an empty array. 
   */
  infect_newly_infected() {
    this.newly_infected.forEach((person) => {
      this.population[person].infection = this.virus
    })

    this.current_infected = this.newly_infected;
    this.newly_infected = [];
  }

  /**
   * Iterates through population and for each person infected it runs did_survive_infection,
   * which determines if person becomes immune or dies from infection.
   */
  kill_or_vaccinate() {
    this.population.forEach((person) => {
      if (person.infection) {
        person.did_survive_infection();
      }
    })
  }
}

export default Simulation