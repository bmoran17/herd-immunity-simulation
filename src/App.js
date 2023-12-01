import Simulation from './utils/simulation';
import Virus from './utils/virus';

function App() {
  const virus1 = new Virus ("Ebola", .21, .27 )
  const simulation = new Simulation (10000, .10, 50, virus1, 20)
  simulation.run()
  return (
    <div className="App">
      hello
    </div>
  );
}

export default App;
