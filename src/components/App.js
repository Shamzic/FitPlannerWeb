import React, { Component } from 'react'
import LinkList from './LinkList'
import CreateLink from './CreateLink'
import Header from './Header'
import Footer from './Footer'
import { Switch, Route } from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import Profile from './Profile'
import About from './About'
import Edit from './Edit'
import Suggestion from './Suggestion'
import Exercise from './Exercise'
import Training from './Training'

class App extends Component {
  render() {
    return (
      <div className="">
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/news" component={LinkList} />
            <Route exact path="/create" component={CreateLink} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/edit" component={Edit} />
            <Route exact path="/suggestion" component={Suggestion} />
            <Route exact path="/exercise" component={Exercise} />
            <Route exact path="/training" component={Training} />
          </Switch>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default App
