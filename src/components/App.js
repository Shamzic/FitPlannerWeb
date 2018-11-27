import React, { Component } from 'react'
import LinkList from './LinkList'
import CreateLink from './CreateLink'
import Header from './Header'
import { Switch, Route } from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import Profile from './Profile'
import About from './About'
import Edit from './Edit'
import Exercices from './Exercices'

class App extends Component {
  render() {
    return (
      <div className="">
        <Header />
        <div className="">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/news" component={LinkList} />
            <Route exact path="/create" component={CreateLink} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
			      <Route exact path="/edit" component={Edit} />
            <Route exact path="/exercices" component={Exercices} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App
