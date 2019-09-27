import React from 'react';
import './App.css';

const App = () => {

 const handleClick = async () => {
    const data = await fetch('http://localhost:5000')
    console.log(data)
  }
  return (
    <div>
      <h1>Hello world</h1>
      <button onClick={handleClick}>pay me</button>
    </div>
  );
}

export default App;
