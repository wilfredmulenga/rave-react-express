import React from 'react'

class Verify extends React.Component {
  componentDidMount () {
    console.log(this.props.location)
  }
  render () {
    return (
      <div className="container">
        <div className="formContainer">
          <h1>Congratulations!</h1>
          <p>transaction with txRef .... was successful</p>
        </div>
      </div>
      // TODO: Add a transaction failed statement
    )
  }
}

export default Verify
