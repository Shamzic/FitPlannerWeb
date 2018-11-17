import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import '../styles/Login.css'

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
      <div className="container text-center" id="main">
        <div class="row justify-content-md-center">
          <div className="col col-lg-4">

            <h4 className="">{login ? 'Login' : 'Sign Up'}</h4>
          <div className="form-group">
              {!login && (
                <input
                  className="form-control"
                  value={name}
                  onChange={e => this.setState({ name: e.target.value })}
                  type="text"
                  placeholder="Username"
                />
              )}
              <input
                className="form-control"
                value={email}
                onChange={e => this.setState({ email: e.target.value })}
                type="email"
                placeholder="Email"
                />
              <input
                className="form-control"
                value={password}
                onChange={e => this.setState({ password: e.target.value })}
                type="password"
                placeholder="Password"
                />

              <Mutation
                className=""
                mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
                variables={{ email, password, name }}
                onCompleted={data => this._confirm(data)}
                >
                  {mutation => (
                      <button type="submit" className="btn btn-lg btn-primary btn-block" id="button"
                         onClick={mutation} disabled={!this.validateForm()}>
                        {login ? 'login'
                           : 'create account'}
                      </button>
                  )}
              </Mutation>
                <button  type="submit" className="btn btn-lg btn-primary btn-block" id="button"
                  onClick={() => this.setState({ login: !login })}
                >
                  {login
                    ? 'need to create an account?'
                    : 'already have an account?'}
                </button>
              </div>
            </div>
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
