import "./description.css"

const Description = () => {
  return (
    <div className="description">
      <p className="intro">Welcome to a simulation of how a virus 
      spreads through a population where some have already been 
      vaccinated against the virus.</p>

      <p className="details"><span>How it works: </span>
      During each timestep of the simulation, each person initially infected will interact for a set number of times. 
      They will be able to infect healthy unvaccinated people. At the end of the timestep, infected people will either 
      die of the infection or become immune (vaccinated). Those newly infected will then go on to the next timestep and
      do the same thing. This will stop until there is no one else to infect, meaning healthy people remaining either 
      all died or became vaccinated.</p>

      <p className="directions"><span>Directions: </span>Input data for simulation and virus details below. Click
      submit to run simulation. You will then see the initial breakdown of the population and a distribution of 
      infected, vaccinated, dead, and unvaccinated people for each timestep.</p>
    </div>
  )
}

export default Description;