import "./form.css"

const Form = (props) => {
  const {setPopSize, setVaccPerc, setInitialInfected, setInteractions, setVirusName, setVirusReproRate, setVirusMortaRate} = props;
  const handleSubmit = (e) => {
    e.preventDefault();
    const inputs = e.target;

    // set values from form
    setPopSize(inputs[0].value);
    setVaccPerc(inputs[1].value);
    setInitialInfected(inputs[2].value);
    setInteractions(inputs[3].value);
    setVirusName(inputs[4].value);
    setVirusReproRate(inputs[5].value);
    setVirusMortaRate(inputs[6].value);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}> 
        <div className="inputs">
          <div className="left pop-details">
            <p>Simulation Details</p>
            <label htmlFor="pop-size">Population Size: </label>
            <input type= "number" name="pop-size" required/>
            <br/>
            <label htmlFor="vacc-perc">Vaccination Percentage: </label>
            <input type="number" name="vacc-perc"required/>
            <br/>
            <label htmlFor="initial-infected">Initial Infected: </label>
            <input type= "number" name="initial-infected"/>
            <br/>
            <label htmlFor="interactions">Interactions: </label>
            <input type= "number" name="interactions" required/>
            <br/>
          </div>
          <div className="right virus-details">
            <p>Virus Details</p>
            <label htmlFor="name">Name: </label>
            <input type= "text" name="name"/>
            <br/>
            <label htmlFor="repro-rate">Reproduction Rate: </label>
            <input type= "number" name="repro-rate" required/>
            <br/>
            <label htmlFor="mortality-rate">Mortality Rate: </label>
            <input type= "number" name="mortality-rate" required/>
            <br/>
          </div>
        </div>
        <button className="form-btn" type="submit">Submit</button>
      </form>
    </div>

  )
}

export default Form;