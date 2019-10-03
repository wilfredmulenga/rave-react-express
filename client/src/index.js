import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import Verify from './Verify'

const Main = () => {
  return (
    <Router>
      <Route exact path="/" component={ App } />
      <Route path="/verify" component={ Verify } />
    </Router>
  )
}

ReactDOM.render(<Main />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
