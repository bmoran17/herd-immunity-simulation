import { useEffect, useState } from "react";
import Form from "./components/Form";
import Virus from "./utils/virus";

function App() {
  const [popSize, setPopSize] = useState();
  const [vaccPerc, setVaccPerc] = useState();
  const [initialInfected, setInitialInfected] = useState();
  const [interactions, setInteractions] = useState();
  const [virusName, setVirusName] = useState("");
  const [virusReproRate, setVirusReproRate] = useState();
  const [virusMortaRate, setVirusMortaRate] = useState();
  const [beginSimulation, setBeginSimulation] = useState(false);

  const startSimulation = () => {
    const virus = new Virus(virusName, virusReproRate, virusReproRate);
    // const simulation = new Simulation(popSize, vaccPerc, initialInfected, interactions);
  }

  useEffect(() => {
    startSimulation()
  }, [])

  

  return (
    <>
    <h1>Herd Immunity Simulation</h1>
    <Form 
      setPopSize={setPopSize} 
      setVaccPerc={setVaccPerc} 
      setInitialInfected={setInitialInfected}
      setInteractions={setInteractions}
      setVirusName={setVirusName}
      setVirusReproRate={setVirusReproRate}
      setVirusMortaRate={setVirusMortaRate}
    />
    </>
  );
}

export default App;
