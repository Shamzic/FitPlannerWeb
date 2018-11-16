import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import '../styles/Login.css'
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`



class Login extends Component {

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  state = {
    login: true, // switch between Login and SignUp
    email: '',
    password: '',
    name: '',
  }

  render() {
    const { login, email, password, name } = this.state
    return (
      <div className="container-fluid" id="main">
        <h4 className="">{login ? 'Login' : 'Sign Up'}</h4>
        <div className="">
          {!login && (
            <input
              value={name}
              onChange={e => this.setState({ name: e.target.value })}
              type="text"
              placeholder="Your name"
            />
          )}
        <br/>
          <input
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
            type="text"
            placeholder="Your email address"
          />
        <br/>
          <input
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
            type="password"
            placeholder="Choose a safe password"
          />
        </div>
        <div className="">
          <Mutation
            mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
            variables={{ email, password, name }}
            onCompleted={data => this._confirm(data)}
            >
              {mutation => (
                  <button type="button" className="btn btn-dark" id="button"
                     onClick={mutation}>
                  {login ? 'login' : 'create account'}
                </button>
              )}
            </Mutation>
          <br/>
          <button type="button" className="btn btn-dark" id="button"
            onClick={() => this.setState({ login: !login })}
          >
            {login
              ? 'need to create an account?'
              : 'already have an account?'}
          </button>
    </div>

      </div>
    )
  }

  _confirm = async data => {
    const { token } = this.state.login ? data.login : data.signup
    this._saveUserData(token)
    this.props.history.push(`/home`)
  }

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }
}

export default Login
