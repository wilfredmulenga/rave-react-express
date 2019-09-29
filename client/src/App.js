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
  }

 render(){
  return (
    <div>
      <h1>Hello world</h1>
      <button onClick={() => this.handleClick()}>pay me</button>
    </div>
  );
 }
}

export default App;
