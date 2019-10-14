import React from 'react'
import { Link } from 'react-router-dom'
import './App.css'

const Home = () => {
  return (
    <div className="container">
      <div className="innerContainer">
        <h1>Welcome to the Flutterwave Rave test</h1>
        <h2>Which form of payment do you want to try?</h2>
        <div className="buttonWrapper">
          <Link to='/card'>
            <button className="button" >Card</button>
          </Link>
          <Link to='/mobilemoney'>
            <button className="button">MTN Mobile Money</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
