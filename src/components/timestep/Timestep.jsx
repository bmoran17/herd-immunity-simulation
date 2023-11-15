import { useState } from "react";
import { Pie } from "react-chartjs-2";
import "./timestep.css";

const Timestep = (props) => {
  const {data} = props;

  const [timestepData, setTimestepData] = useState({
    labels: [
      'Infected',
      'Dead',
      'Vaccinated',
      'Unvaccinated'
    ],
    datasets: [{
      label: "People",
      data: [1,2,3,4]
    }],
    hoverOffset: 10
  });

  return (
    <div className="timesteps">
      <h2 className="title">Time Step # 1</h2>
      <div className="info-container">
        <div className="pie-chart">
          {/* <Pie chartData ={timestepData} /> */}
        </div>
        <div className="timestep-info">
        <p>[infected amount] interacted with [interactions] people. Resulting in: </p>
        <p>{data[2]} more infected</p>
        <p>{data[3]} dead</p>
        <p>{data[4]} more vaccinated</p> 
        <p>{data[5]} still healthy, unvaccinated</p>
        </div>
      </div>
      
      <hr />
    </div>
  )
}

export default Timestep;