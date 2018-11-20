import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { AUTH_TOKEN } from '../constants'
import '../styles/CustomNavbar.css'

class Header extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    return (

         <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
          <div className="row">
            <Link to="/" className="navbar-brand">
               FitPlanner
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

          </div>
          <div className="collapse navbar-collapse" id="navbarsExampleDefault">
           <ul className="navbar-nav mr-auto">
           <li className="nav-item active">
             <a className="nav-link" href="/">Home
               <span className="sr-only">
                (current)
               </span>
             </a>
          </li>
          <div>
            {authToken && (
            <li className="nav-item active">
              <Link to="/create" className="nav-link">Submit</Link>
            </li>
            )}
          </div>
		  <div>
            {authToken && (
            <li className="nav-item active">
              <Link to="/profile" className="nav-link">Profile</Link>
            </li>
            )}
          </div>
            <li className="nav-item active">
            {authToken ? (
              <div
                className="nav-link"
                onClick={() => {
                  localStorage.removeItem(AUTH_TOKEN)
                  this.props.history.push(`/`)
                }}
              >
                Logout
              </div>
            ) : (
              <Link to="/login" className="nav-link">
                Login
              </Link>
            )}
          </li>
        </ul>
          </div>
        </nav>
    )
  }
}

export default withRouter(Header)
