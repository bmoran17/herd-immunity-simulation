import { useState } from "react";
import PieChart from '../PieChart';
import "./population.css";

const Population = (props) => {
  const {data} = props;
  console.log("data for pop", data )

  const[populationData, setPopulationData] = useState({
    datasets: [{
      label: "Data",
      data: [2,3,6,54,5]
    }]
  });
  
  return (
    <div>
      <h2 className="title">Creating Population</h2>
      <div className="pop-container">
        <div className="pie-chart">
          <PieChart chartData ={populationData} />
        </div>
        <div className="pop-details">
        <p>Total population: </p>
        <p>Amount Vaccinated: </p>
        <p>Amount Infected: </p>
        </div>
      </div>
      <hr />
    </div>
  )
}

export default Population;