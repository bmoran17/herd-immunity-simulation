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
 * @returns {array} - Id of healthy people who are unvaccinated and not infected.
 */
  getAlivePeople(id) {
    const peopleAlive = this.population.filter((person) => person.is_alive && id !== person._id && !person.is_vaccinated && !person.infection);
    return peopleAlive.map((person) => person._id)
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

    // checks if there's still a healthy unvaccinated person alive
    return (this.population.some((person) => person.is_alive && !person.is_vaccinated && !person.infection))
  }

  /** 
   * Runs the simulation until simulation_should_continue is false.
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
  }

  /**
   * It provides us randomly selected people ids we can interact with. 
   * @param {array} alive - People ids who are alive and not vaccinated.
   * @param {number} count - The amount of people we want from the alive array (interactions needed).
   * @returns {array} sample - Ids of people who can get sick.
   */
  interaction_sample (alive, count) {
    let sample = [];

    while (count > 0) {
      const random_num = Math.floor(Math.random() * alive.length);
      const alive_person= alive[random_num];
      // checks sample array to see if alive person is not in array
      if (!sample.some(person =>  person === alive_person)) {
        sample.push(alive_person);
        count--
      }
    }
    return sample;
  }

  /**
   * Each infected person will have interactions with healthy people.
   * First the infected person is passed to the getter method getAlivePeople to generate a list of people that can still get infected.
   * If healthy people is less than the total interactions, the infected person interacts will all healthy people. 
   * If healthy people is more than the total interactions, we call the method interaction_sample() to generate an array with
   * random healthy people's ids for our interactions. 
   */
  time_step() {
    this.current_infected.forEach((infected_id) => {
      let interactions = undefined;
      // list of people that can get infected
      let healthy_people = this.getAlivePeople(infected_id);

      if (healthy_people.length <= this.total_interactions) {
        interactions = healthy_people
      } else {
        interactions = this.interaction_sample(healthy_people, this.total_interactions);
      }

      interactions.forEach((healthy_person) => {
        if (this.newly_infected.indexOf(healthy_person) === -1) {
          this.interaction(healthy_person);
        } 
      })
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
    } else {
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
   * Runs the method did_survive_infection on each current infected person
   * to determines if person becomes immune or dies from infection.
   */
  kill_or_vaccinate() {
    this.current_infected.forEach((infected_id) => {
      const infected = this.population[infected_id];
      infected.did_survive_infection()
    })
  }
}

export default Simulation