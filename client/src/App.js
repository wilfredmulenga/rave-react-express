import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      amount: '',
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    }
  }

  handleClick = async () => {
   const { amount, cardNumber, expiryDate, cvv } = this.state
   const data = await fetch(`http://localhost:5000`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ amount, cardNumber, expiryDate, cvv })
   })
   const res = await data.json()
   console.log(res)
  }

  handleInput = (field, value) => this.setState({ [field]: value })

 render(){

  // TODO: configure eslint
  return (
    <div className="container">
      <div className="formContainer">
      <h1>Rave payment test</h1>
      <input placeholder="amount" type="number" onChange={(e) => this.handleInput("amount", e.target.value)} />
      <input placeholder="card number" type="number" onChange={(e) => this.handleInput("cardNumber", e.target.value)} />
      <input placeholder="expiry date" type="text" onChange={(e) => this.handleInput("expiryDate", e.target.value)} />
      <input placeholder="cvv" type="number" onChange={(e) => this.handleInput("cvv", e.target.value)} />
      <button onClick={() => this.handleClick()}>pay me</button>
      </div>
    </div>
  );
 }
}

export default App;
