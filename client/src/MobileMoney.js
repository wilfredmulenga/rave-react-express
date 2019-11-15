import React from 'react'
import { Link } from 'react-router-dom'

class MobileMoney extends React.Component {
  constructor() {
    super()
    this.state = {
      fields: {
        mobileNumber: '',
        amount: '',
        pendingValidation: false
      },
      loading: false,
      errorMessage: ''
    }
  }

  onSubmitForm = async (evt) => {
    evt.preventDefault()
    if (this.validate()) return
    const { amount, mobileNumber } = this.state.fields
    this.setState({ loading: true })
    try {
      const data = await fetch(`http://localhost:5000/mobile-money`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount, mobileNumber })
      })
      const result = await data.json()
      this.setState({ loading: false })
      const { message: { status, authModelUsed, chargeResponseCode } } = result
      if (status === 'success-pending-validation'
        && authModelUsed === 'MOBILEMONEY'
        && chargeResponseCode === '02'
      ) {
        this.setState({
          pendingValidation: true
        })
      }
    } catch (error) {
      this.setState({
        loading: false,
        errorMessage: 'an error occcured. Please try again'
      })
    }
  }

  validate = () => {
    const { mobileNumber } = this.state.fields
    const { errorMessage } = this.state

    if (mobileNumber.length !== 10) {
      this.setState({ errorMessage: 'mobile number length not valid' })
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

  renderPendingValidation = (
    <>
      <p>You should receive a prompt to authorize the transaction on the phone with the phone number used</p>
      <br />
      <br />
      <Link to='/'>
        <button
          className="button"
        >Return to home</button>
      </Link>
    </>
  )


  render() {
    const { amount, mobileNumber } = this.state.fields
    const { pendingValidation, loading, errorMessage } = this.state
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
          <h1>MTN mobile money payment test</h1>
          {pendingValidation ? this.renderPendingValidation
            :
            <form onSubmit={this.onSubmitForm}>
              <input
                placeholder="amount"
                type="number"
                name="amount"
                onChange={this.onInputChange}
                value={amount}
                required />
              <input
                placeholder="0967000000"
                type="number"
                name="mobileNumber"
                value={mobileNumber}
                onChange={this.onInputChange}
                required />
              <button
                className="button"
                type="submit"
              >pay</button>
            </form>
          }
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

export default MobileMoney