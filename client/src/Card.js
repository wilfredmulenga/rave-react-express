import React from 'react'

class Card extends React.Component {
  constructor() {
    super()
    this.state = {
      fields: {
        amount: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
      },
      errorMessage: '',
      loading: false
    }
  }

  onFormSubmit = async (evt) => {
    evt.preventDefault()
    if (this.validate()) return
    this.setState({ loading: true })
    const { amount, cardNumber, expiryDate, cvv } = this.state.fields
    try {
      const data = await fetch(`http://localhost:5000/initiate-charge`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount, cardNumber, expiryDate, cvv })
      })

      const result = await data.json()
      const { message: { authurl, status }, statusCode } = result
      if (statusCode === 200 && status === 'success-pending-validation' && authurl) {
        this.setState({ loading: false })
        window.location.assign(authurl)
      }
      if (statusCode === 400) {
        this.setState({ errorMessage: result.message })
      }
    } catch (error) {
      this.setState({
        loading: false,
        errorMessage: 'an error occcured. Please try again'
      })
    }
  }

  validate = () => {
    const { cardNumber, expiryDate, cvv } = this.state.fields
    const { errorMessage } = this.state

    if (cardNumber.length !== 16) {
      this.setState({ errorMessage: 'card number length not valid' })
      return true
    }
    if (expiryDate.length !== 5) {
      this.setState({ errorMessage: 'expiry date length not valid' })
      return true
    }
    if (cvv.length !== 3) {
      this.setState({ errorMessage: 'cvv length not valid' })
      return true
    }

    if (errorMessage.length > 0) return true
  }

  onInputChange = (evt) => {
    const { name, value } = evt.target
    const { fields } = this.state
    fields[name] = value
    this.setState({ fields, errorMessage: '' })
  }

  render() {

    const { amount, cardNumber, expiryDate, cvv } = this.state.fields
    const { errorMessage, loading } = this.state
    if (loading) {
      return (
        <div className="loader-container">
          <div className="loader" />
        </div>
      )
    }
    return (
      <div className="container">
        <div className="inner-container">
          <h1>Card payment test</h1>
          <form onSubmit={this.onFormSubmit}>
            <input
              placeholder="amount"
              type="number"
              name="amount"
              onChange={this.onInputChange}
              value={amount}
              required />
            <input
              placeholder="card number"
              type="text"
              name="cardNumber"
              onChange={this.onInputChange}
              value={cardNumber}
              required />
            <input
              placeholder="expiry date"
              type="text"
              name="expiryDate"
              onChange={this.onInputChange}
              value={expiryDate}
              required />
            <input
              placeholder="cvv"
              type="number"
              name="cvv"
              onChange={this.onInputChange}
              value={cvv}
              required />
            <button
              className="button"
              type="submit"
            >pay</button>
          </form>
          {
            (errorMessage !== '') ?
              <div className='error-message'>
                <p>{errorMessage}</p>
              </div>
              : null
          }
        </div>
      </div>
    );
  }
}

export default Card