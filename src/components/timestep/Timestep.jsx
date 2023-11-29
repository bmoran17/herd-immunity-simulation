import { useState } from "react";
import { Line } from "react-chartjs-2";
import 'chart.js/auto';
import "./timestep.css";

const Timestep = (props) => {
  const {data} = props;

  const [timestepData, setTimestepData] = useState({
    labels: [1,2,3,4],
    datasets: [{
      label: "Infected",
      data: [1,2,3,4],
      backgroundColor: 'rgb(230, 15, 11)',
      borderColor: 'rgb(230, 15, 11)'
      },{
      label: "Vaccinated",
      data: [12, 3, 8, 7],
      backgroundColor: 'rgb(9, 189, 15)',
      borderColor: 'rgb(9, 189, 15)'
      },{
      label: "Dead",
      data: [0, 6, 8, 19],
      backgroundColor: 'rgb(58, 52, 71)',
      borderColor: 'rgb(58, 52, 71)'
      },{
      label: "Unvaccinated",
      data: [15, 19, 67, 3],
      backgroundColor: 'rgb(54, 162, 235)',
      borderColor: 'rgb(54, 162, 235)'
      }
    ]
  });

  const options = {
    scales: {
      y: {
        title: {
          display: true,
          text: "People"
        }
      },
      x: {
        title: {
          display: true,
          text: "Timesteps"
        }
      }
    }
  }

  return (
    <div className="timesteps">
      <h2 className="title">Timesteps</h2>
      <div className="info-container">
        <div className="line-chart">
          <Line data={timestepData} options={options}/>
        </div>
        <div className="timesteps-summary">
          <p>At timestep 4, virus died out or there was no one else to infect.</p>
        </div>
      </div>
      
      <hr />
    </div>
  )
}

export default Timestep;