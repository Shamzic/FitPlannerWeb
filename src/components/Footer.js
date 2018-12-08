import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import '../styles/Footer.css'

class Footer extends Component {

  render() {
    return (
      <div>
        <div id="wrap">
          <div id="main" class="container clear-top">

          </div>
        </div>
        <footer class="footer">
          <p> Copyrights © FitPlanner 2018</p>
        </footer>
      </div>



   )
  }
}

export default withRouter(Footer)
