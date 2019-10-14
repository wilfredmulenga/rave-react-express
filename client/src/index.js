import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './Home'
import * as serviceWorker from './serviceWorker'
import Card from './Card'
import MobileMoney from './MobileMoney'

const Main = () => {
  return (
    <Router>
      <Route exact path="/" component={ Home } />
      <Route path="/card" component={ Card } />
      <Route path="/mobilemoney" component={ MobileMoney } />
    </Router>
  )
}

ReactDOM.render(<Main />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
