import { useEffect, useState } from "react";
import Form from "./components/Form";
import Virus from "./utils/virus";
import Timestep from "./components/Timestep";
import Population from "./components/Population";
import "./app.css";

function App() {
  const [popSize, setPopSize] = useState(0);
  const [vaccPerc, setVaccPerc] = useState(0);
  const [initialInfected, setInitialInfected] = useState(0);
  const [interactions, setInteractions] = useState(0);
  const [virusName, setVirusName] = useState("");
  const [virusReproRate, setVirusReproRate] = useState(0);
  const [virusMortaRate, setVirusMortaRate] = useState(0);
  const [beginSimulation, setBeginSimulation] = useState(false);

  const renderSimulation = () => {
    setBeginSimulation(!beginSimulation);
  }

  const data = [10, 2, 5, 1, 3, 12 ];

  const startSimulation = () => {
    const virus = new Virus(virusName, virusReproRate, virusMortaRate);
    console.log(virus)
    // const simulation = new Simulation(popSize, vaccPerc, initialInfected, interactions);
  }

  useEffect(() => {
    if (popSize > 0) {
      startSimulation()
    }
  }, [beginSimulation]);

  return (
    <>
    <h1>Herd Immunity Simulation</h1>
    <Form 
      renderSimulation={renderSimulation}
      setPopSize={setPopSize} 
      setVaccPerc={setVaccPerc} 
      setInitialInfected={setInitialInfected}
      setInteractions={setInteractions}
      setVirusName={setVirusName}
      setVirusReproRate={setVirusReproRate}
      setVirusMortaRate={setVirusMortaRate}
    />
    <Population />
    <Timestep data={data} />
    </>
  );
}

export default App;
