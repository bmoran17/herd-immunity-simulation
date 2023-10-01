const Timestep = (props) => {
  const {data} = props;
  return (
    <div className="timesteps">
      <h2>Time Step # []</h2>
      <div className="left-current">
        <p>Each initially infected person had {data[0]} interactions with other people.</p>
        <p>People initially sick: {data[1]}</p>
        <p>People newly infected: {data[2]}</p>
        <p>People dead: {data[3]}</p>
        <p>People vaccinated: {data[4]}</p> 
      </div>
      <div className="right-overall">
        <p>Total dead: </p>
        <p>Total vaccinated: </p>
        <p>People alive not vaccinated yet: </p>
      </div>

    </div>
  )
}

export default Timestep;