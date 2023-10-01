import { Tooltip as ReactTooltip } from "react-tooltip";
import "./form.css"

const Form = (props) => {
  const {renderSimulation, setPopSize, setVaccPerc, setInitialInfected, setInteractions, setVirusName, setVirusReproRate, setVirusMortaRate} = props;
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
    renderSimulation();
  }

  const tooltips = [
    {
      id: "my-tooltip-1",
      content: "Amount of people in population."
    },
    {
      id: "my-tooltip-2",
      content: "Rate of people already vaccinated in population."
    }
  ];

  const getToolTips = () => (
    tooltips.map((tip) => (
      <ReactTooltip 
        id={tip.id}
        content={tip.content}
        place="left"
      />
    ))
  )

  return (
    <div>
      <form onSubmit={handleSubmit}> 
        <div className="inputs">
          <div className="left pop-details">
            <p className="info-title">Simulation Details</p>
            <label data-tooltip-id="my-tooltip-1" htmlFor="pop-size">Population Size: </label>
            <input type= "number" name="pop-size" required/>
            <img src="help-icon" />
            <br/>
            <label data-tooltip-id="my-tooltip-2" htmlFor="vacc-perc">Vaccination Percentage: </label>
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
            <p className="info-title">Virus Details</p>
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
        <div className="submit-btn">
          <button className="form-btn" type="submit">Submit</button>
        </div>
      </form>
      <hr />
      {getToolTips()}
    </div>

  )
}

export default Form;