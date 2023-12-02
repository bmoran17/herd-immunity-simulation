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
      id: "my-tooltip-0",
      content: "Amount of people in population.",
      place: "left"
    },
    {
      id: "my-tooltip-1",
      content: "Rate of people already vaccinated in population.",
      place: "left"
    },
    {
      id: "my-tooltip-2",
      content: "Amount of people already infected.",
      place: "left"
    },
    {
      id: "my-tooltip-3",
      content: "Amount of interactions each infected person will have every timestep.",
      place: "left"
    },
    {
      id: "my-tooltip-4",
      content: "Name for virus.",
      place: "right"
    },
    {
      id: "my-tooltip-5",
      content: "Rate that virus spreads.",
      place: "left"
    },
    {
      id: "my-tooltip-6",
      content: "Rate of infected people who died with the virus.",
      place: "right"
    }
  ];

  const inputs = [
    {
      name: "pop-size",
      content: "Population Size:",
      inputType: "number",
    },
    {
      name: "vacc-perc",
      content: "Vaccination Percentage:",
      inputType: "number",
    },
    {
      name: "initial-infected",
      content: "Initial Infected:",
      inputType: "number",
    },
    {
      name: "interactions",
      content: "Interactions:",
      inputType: "number",
    }, 
    {
      name: "virus-name",
      content: "Name:",
      inputType: "number",
    },
    {
      name: "repro-rate",
      content: "Reproduction Rate:",
      inputType: "number",
    },
    {
      name: "mortality-rate",
      content: "Mortality Rate:",
      inputType: "number",
    }
  ]

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

  const getInput = (num) => {
    const input = inputs[num]
    console.log("input", input)
    return (
      <div className="input">
        <label htmlFor={input.name}>{input.content}</label>
        {getIcon(num)} 
        <input type={input.inputType} name={input.inputType} required/>
      </div>
    )
  }

  return (
    <div>
      <form onSubmit={handleSubmit}> 
        <div className="inputs-container">
          <div className="left pop-details">
            <p className="info-title">Simulation Details</p>
            {getInput(0)}
            <br/>
            {getInput(1)}
            <br/>
            {getInput(2)}
            <br/>
            {getInput(3)}
            <br/>
          </div>
          <div className="right virus-details">
            <p className="info-title">Virus Details</p>
            {getInput(4)}
            <br/>
            {getInput(5)}
            <br/>
            {getInput(6)}
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