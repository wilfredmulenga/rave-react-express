import React from 'react'

class Card extends React.Component {
  constructor(){
    super()
    this.state = {
     fields: {
      amount: '',
      cardNumber: '',
      expiryDate: '',
      cvv: ''
     }
    }
  }

  handleClick = async () => {
   const { amount, cardNumber, expiryDate, cvv } = this.state
   try {
   const data = await fetch(`http://localhost:5000/initiate-charge`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ amount, cardNumber, expiryDate, cvv })
   })
   const res = await data.json()

   const { message: { authurl, status } } = res
   if(status === 'success-pending-validation' && authurl) {
    window.location.assign(authurl)
   }
  } catch(error) {
    // TODO: remove log and show error message
    console.log(error)
  }
  }

  onInputChange = (evt) => {
    const { name, value } = evt.target
    const { fields } = this.state
    fields[name] = value
    this.setState({ fields })
  }

 render(){

  // TODO: configure eslint
  // TODO: call this route 'card' and make a separate 'mtn' mobile money route
  // TODO: clear input fields after pressing the button
  // TODO: show success, error message, and/or loader after pressing the button
  return (
    <div className="container">
      <div className="innerContainer">
      <h1>Card payment test</h1>
      <input
      placeholder="amount"
      type="number"
      name="amount"
      onChange={this.onInputChange}
      value={this.state.fields.amount}
      required />
      <input
      placeholder="card number"
      type="text"
      name="cardNumber"
      onChange={this.onInputChange}
      value={this.state.fields.cardNumber}
      required />
      <input
      placeholder="expiry date"
      type="text"
      name="expiryDate"
      onChange={this.onInputChange}
      value={this.state.fields.expiryDate}
      required />
      <input
      placeholder="cvv"
      type="number"
      name="cvv"
      onChange={this.onInputChange}
      value={this.state.fields.cvv}
      required />
      <button
      className="button"
      onClick={() => this.handleClick()}>pay</button>
      </div>
    </div>
  );
 }
}

export default Card