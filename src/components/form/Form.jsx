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
      content: "Amount of people in population.",
      place: "left"
    },
    {
      id: "my-tooltip-2",
      content: "Rate of people already vaccinated in population.",
      place: "left"
    },
    {
      id: "my-tooltip-3",
      content: "Amount of people already infected.",
      place: "left"
    },
    {
      id: "my-tooltip-4",
      content: "Amount of interactions each infected person will have every timestep.",
      place: "left"
    },
    {
      id: "my-tooltip-5",
      content: "Name for virus.",
      place: "right"
    },
    {
      id: "my-tooltip-6",
      content: "Rate that virus spreads.",
      place: "left"
    },
    {
      id: "my-tooltip-7",
      content: "Rate of infected people who died with the virus.",
      place: "right"
    }
  ];

  const getToolTips = () => (
    tooltips.map((tip) => (
      <ReactTooltip 
        id={tip.id}
        content={tip.content}
        place="top"
      />
    ))
  )
  const getIcon = (num) => (
    <img 
      data-tooltip-id={`my-tooltip-${num}`}
      src={require('../images/help-icon.png')} 
      alt="Help Icon."
    />
  )

  return (
    <div>
      <form onSubmit={handleSubmit}> 
        <div className="inputs-container">
          <div className="left pop-details">
            <p className="info-title">Simulation Details</p>
            <div className="input">
              <label htmlFor="pop-size">Population Size:</label>
              {getIcon(1)} 
              <input type= "number" name="pop-size" required/>
            </div>
            <br/>
            <div className="input">
              <label htmlFor="vacc-perc">Vaccination Percentage:</label>
              {getIcon(2)}
              <input type="number" name="vacc-perc"required/>
            </div>
            <br/>
            <div className="input">
              <label htmlFor="initial-infected">Initial Infected:</label>
              {getIcon(3)}
              <input type= "number" name="initial-infected"/>
            </div>
            <br/>
            <div className="input">
              <label htmlFor="interactions">Interactions:</label>
              {getIcon(4)}
              <input type= "number" name="interactions" required/>
            </div>
            <br/>
          </div>
          <div className="right virus-details">
            <p className="info-title">Virus Details</p>
            <div className="input">
              <label htmlFor="name">Name:</label>
              {getIcon(5)}
              <input type= "text" name="name" required/>
            </div>
            <br/>
            <div className="input">
              <label htmlFor="repro-rate">Reproduction Rate:</label>
              {getIcon(6)}
              <input type= "number" name="repro-rate" required/>
            </div>
            <br/>
            <div className="input">
              <label htmlFor="mortality-rate">Mortality Rate:</label>
              {getIcon(7)}
              <input type= "number" name="mortality-rate" required/>
            </div>
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