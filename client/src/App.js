import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Card from './Card'
import Verify from './Verify'
import './App.css'

class App extends React.Component {
  render () {
    return (
      <Router>
        <Route path='/' component={Card} />
        <Route path='/verify' component={Verify} />
      </Router>
    )
  }
}

export default App
