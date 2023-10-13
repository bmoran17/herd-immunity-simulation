import { useState } from "react";
import PieChart from '../PieChart';
import "./timestep.css";

const Timestep = (props) => {
  const {data} = props;
  console.log("dataaaa", data);

  const [timestepData, setTimestepData] = useState({
    datasets: [{
      label: "Data",
      data: [1,2,3,4,5]
    }]
  });

  return (
    <div className="timesteps">
      <h2 className="title">Time Step # []</h2>
      <div className="info-container">
        <div className="pie-chart">
          <PieChart chartData ={timestepData} />
        </div>
        <div className="timestep-info">
        <p>During this timestep, [infected amount] interacted with [interactions] people. Resulting in: </p>
        <p>Infected Amount: {data[2]}</p>
        <p>Dead Amount: {data[3]}</p>
        <p>Vaccinated Amount: {data[4]}</p> 
        <p>Healthy, unvaccinated people: </p>
        </div>
      </div>
      
      <hr />
    </div>
  )
}

export default Timestep;