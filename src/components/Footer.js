import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import '../styles/Footer.css'

class Header extends Component {
  render() {
    return (
     <div className="navbar navbar-expand-md fixed-bottom w3-theme-d2">
     <div className="col">
        <p id="titleFooter"> Copyright @ 2018 FitPlanner </p>
        </div>
     </div>
   )
  }
}

export default withRouter(Header)
