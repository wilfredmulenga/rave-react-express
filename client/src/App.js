import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      message: ''
    }
  }
  handleClick = async () => {
   const data = await fetch(`http://localhost:5000`)
   const res = await data.json()
   console.log(res)
  }

 render(){

  // TODO: configure eslint
  return (
    <div className="container">
      <div className="formContainer">
      <h1>Rave payment test</h1>
      <input placeholder="amount" type="number" />
      <input placeholder="card number" type="number" />
      <input placeholder="expiry date" type="text" />
      <input placeholder="cvv" type="number" />
      <button onClick={() => this.handleClick()}>pay me</button>
      </div>
    </div>
  );
 }
}

export default App;
