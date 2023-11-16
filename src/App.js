import Simulation from './utils/simulation';
import Virus from './utils/virus';

function App() {
  const virus1 = new Virus ("Ebola", .21, .27 )
  const simulation = new Simulation (20000, .10, 100, virus1, 10)
  simulation.run()
  return (
    <div className="App">
      hello
    </div>
  );
}

export default App;
