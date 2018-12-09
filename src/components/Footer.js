import React, { Component } from 'react'
import { withRouter } from 'react-router'
import '../styles/Footer.css'

class Footer extends Component {

  render() {
    return (
      <div>
        <div id="wrap">
          <div id="main" className="container clear-top">

          </div>
        </div>
        <footer className="footer">
          <p> Copyrights © FitPlanner 2018</p>
        </footer>
      </div>



   )
  }
}

export default withRouter(Footer)
