import React from 'react'

class MobileMoney extends React.Component {
  constructor(){
    super()
    this.state = {
    fields: {
      mobileNumber: '',
      amount: '',
      pendingValidation: false
    },
    loading: false
    }
  }

  handleClick = async () => {
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
   const res = await data.json()
   this.setState({ loading: false })
   const { message: { status, authModelUsed, chargeResponseCode } } = res
   if(status === 'success-pending-validation'
   && authModelUsed === 'MOBILEMONEY'
   && chargeResponseCode === '02'
   ) {
    this.setState({
      pendingValidation: true
    })
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

  renderInputFields = (
      <>
      <input
      placeholder="amount"
      type="number"
      name="number"
      onChange={this.onInputChange}
      required />
      <input
      placeholder="0967000000"
      type="text"
      onChange={this.onInputChange}
      required />
      <button
      className="button"
      onClick={this.handleClick}>pay</button>
      </>
  )

  renderPendingValidation = (
    <>
      <p>You should receive a prompt to authorize the transaction on the phone with the phone number used</p>
    </>
  )


 render(){
  const { pendingValidation, loading } = this.state
  if(loading) {
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
      { pendingValidation ? this.renderPendingValidation : this.renderInputFields  }
      </div>
    </div>
  );
 }
}

export default MobileMoney