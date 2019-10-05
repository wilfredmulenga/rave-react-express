import React from 'react'

class Verify extends React.Component {
  render () {
    return (
      <div className="container">
        <div className="formContainer">
          <h1>Rave payment test</h1>
          <input placeholder="amount" type="number" onChange={(e) => this.handleInput('amount', e.target.value)} required />
          <input placeholder="card number" type="text" onChange={(e) => this.handleInput('cardNumber', e.target.value)} required />
          <input placeholder="expiry date" type="text" onChange={(e) => this.handleInput('expiryDate', e.target.value)} required />
          <input placeholder="cvv" type="number" onChange={(e) => this.handleInput('cvv', e.target.value)} required />
          <button onClick={() => this.handleClick()}>pay me</button>
        </div>
      </div>
    )
  }
}

export default Verify
