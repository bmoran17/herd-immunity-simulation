import { useState } from "react";
import { Pie } from "react-chartjs-2";
import 'chart.js/auto';
import "./population.css";

const Population = (props) => {
  const {data} = props;
  console.log("data for pop", data)

  const[populationData, setPopulationData] = useState({
    labels: [
      'Unvaccinated',
      'Vaccinated',
      'Infected'
    ],
    datasets: [{
      label: 'People',
      data: [data[1], data[2], data[3]],
      backgroundColor: [
        'rgb(54, 162, 235)',
        'rgb(9, 189, 15)',
        'rgb(230, 15, 11)'
      ]
    }]
  });
  
  const options = {
    plugins: {
      legend: {
        position: 'left'
      }
    }
  }

  return (
    <div>
      <h2 className="title">Initial Population</h2>
      <div className="pop-container">
        <div className="pie-chart">
          <Pie className="pie-chart" data={populationData} options={options}/>
        </div>
        <div className="pop-details">
        <table>
          <tr>
            <td></td>
            <td>People</td>
            <td>Percentage</td>
          </tr>
          <tr>
            <td>Initial Population</td>
            <td>{data[0]}</td>
            <td>---</td>
          </tr>
          <tr>
            <td className="vaccinated-row">Vaccinated</td>
            <td>#</td>
            <td>%</td>
          </tr>
          <tr>
            <td className="unvaccinated-row">Unvaccinated</td>
            <td>#</td>
            <td>%</td>
          </tr>
          <tr>
            <td className="infected-row">Infected</td>
            <td>#</td>
            <td>%</td>
          </tr>
        </table>

        <p><span>Results: </span> 7 timesteps </p>
        </div>
      </div>
      <hr />
    </div>
  )
}

export default Population;