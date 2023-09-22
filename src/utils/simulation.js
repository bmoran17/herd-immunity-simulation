import Person from "src/utils/person";
import generateRandomnArray from "src/utils/generateRandomArray";
import logger from "src/utils/logger";

/** Class representing a simulation. */

class Simulation {
  /**
   * 
   * @param {*} pop_size - The population size.
   * @param {*} vacc_percentage - The percentage of population vaccinated.
   * @param {*} initial_infected - The percentage of population vaccinated. 
   * @param {*} virus - The virus object.
   */
  constructor(pop_size, vacc_percentage, initial_infected=0, virus) {
    this.pop_size = pop_size;
    this.vacc_percentage = vacc_percentage;
    this.initial_infected = initial_infected;
    this.virus = virus;
    this.logger = new logger();
    this.newly_infected = [];
    this.current_infected = pop_size;
    this.population = this.create_population();
  }

  alivePeople(id) {
    return this.population.filter((person) => person.is_alive && id !== person._id && !person.is_vaccinated);
  }

  /**
   * Creates the initial population.
   * @return A list of Person objects.
   */
  
  create_population() {
    // population array with person objects
    let pop = [];  
    for (let i = 0; i < this.pop_size; i++) {
      pop.push(new Person(i, false))
    }

    const initial_vacc = Math.ceil(this.pop_size * this.vacc_percentage);
    // Array for infected & vaccinated people
    const randomPeopleIds = generateRandomnArray((this.initial_infected + initial_vacc),this.pop_size);
    console.log("random people ids ", randomPeopleIds)

    // infect people in population
    for (let i = 0; i < this.initial_infected; i++) {
      const random_person = randomPeopleIds[i]; 
      pop[random_person].infection = this.virus;
      //console.log("infected beginning ", pop[random_person]);
    }

    // vaccinate people
    for (let i = this.initial_infected; i < randomPeopleIds.length; i++) {
      const random_person = randomPeopleIds[i];
      pop[random_person].is_vaccinated = true; 
      //console.log("vaccinated beginning ", pop[random_person]);
    }

    return pop;
  }

  /**
   * The simulation should only end if the entire population is dead or everyone is vaccinated.
   * @return {boolean} - If simulation should continue. 
   */
  simulation_should_continue() {
    for (let i = 0; i < this.population.length; i++) {
      const person = this.population[i];
      if (person.is_alive && !person.is_vaccinated && !person.infection) {
        //console.log("healthy person is alive but not vacc", person)
        return true;
      }
    }
    console.log("all vaccinated/dead")
    return false;
  }

  /**
   * Runs the simulation until all requirements for ending the simulation are met.
   * If simulation continues, we call time_step method to compute a time step in the simulation 
   * and infect_newly_infected to add virus object to people infected in the time step.
   */
  run() {
    let time_steps = 0;
    //console.log("begin run", time_steps);
    while (this.simulation_should_continue()) {
      this.time_step(time_steps);
      time_steps += 1;
      this.infect_newly_infected();
      this.kill_or_vaccinate();
   }
    console.log("end pop", this.population);
    console.log(`The simulation has ended after ${time_steps} turns.`);
  }

  interaction_sample (alive, count) {
    let sample = [];
    let counter = 0; 

    while (counter < count) {
      const random_num = Math.floor(Math.random() * alive.length);
      const alive_person= alive[random_num];
      // checks sample array to see if alive person is not in array
      if (!sample.some(person =>  person === alive_person)) {
        sample.push(alive_person);
        counter += 1
      }
    }
    return sample;
  }

  /**
   * Contains all the logic for computing one time step in the simulation.
   * For each infected person there will be 100 random interactions as long as the person is alive
   * and is no the same. 
   */
  time_step(time_steps) {
    this.population.forEach((person) => {
      // if person is infected
      if (person.infection && person.is_alive) {
        console.log(`-------- #${time_steps + 1} Begin interactions for sick person ${person._id} -----------`)
        let alive_people = this.alivePeople(person._id);
        console.log("people to infect", alive_people)

        // if less than 100 possible interactions => interact with what's possible
        if (alive_people.length <= 100) {
          alive_people.forEach((healthy_person) => {
            console.log(`Infected person ${person._id} interacteddd with ${healthy_person._id} ` )
            this.interaction(healthy_person);
          })
        } else {
          // get 100 random alive people to interact with
          const interactions = this.interaction_sample(alive_people, 100);
          console.log("interactions array ", interactions);
          interactions.forEach((rand_healthy_person) => {
            console.log(`Infected person ${person._id} interacted with ${rand_healthy_person._id}`)
            this.interaction(rand_healthy_person);
          })
        }
      }
    })
  }


  /**
   * Called any time two living people are selected for an interaction. 
   * If random person becomes infected, their id is then added to newly_infected array. 
   * @param random_person - The random person that person(param) interacted with.
   */
  interaction(random_person) {
    // random person is vaccinated => nothing happens
    // random person infected already => nothing happens
    // random person gets infected
   // console.log("interaction", random_person);
    const random_num = Math.random();
    // pass person ids
    if (random_num < this.virus.repro_rate) {
      //console.log("new infected person ", random_person, this.newly_infected.length);
      this.newly_infected.push(random_person);
      console.log("newly infected person", random_person._id)
    }
  }



  /**
   * Iterates through the list of ids stored in self.newly_infected and updates
   * each Person object with the virus object.
   */
  infect_newly_infected() {
    // did_survive infection ??
    console.log("-------Infecting Newly Infected --------")
    console.log("inside infect newly infected", this.newly_infected);

    this.newly_infected.forEach((infected) => {
      infected.infection = this.virus;
    })
    for (let i = 0; i < this.newly_infected.length; i++) {
      
    }
    console.log("added virus object to newly infected")
  }

  kill_or_vaccinate() {
    let dead = 0;
    console.log("------- Killing or Vaccinating Infected People --------")
    this.population.forEach((person) => {
      if (person.infection) {
        const infected_survival = person.did_survive_infection();
        // add to dead counter if return person.is_alive is false
        if (!infected_survival) {
          console.log("person dead", person._id)
          dead +=1;
        }
      }
    })
    // reset to empty array
    this.newly_infected = [];
    console.log("empty newly infected ", this.newly_infected.length)
    //return dead;
  }
}

export default Simulation