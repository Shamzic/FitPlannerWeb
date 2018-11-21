import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'
//import { USER_QUERY } from './Profil'
import { Mutation } from 'react-apollo'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Link from './Link'

//const { APP_SECRET, getUserId } = require('../../server/utils')
//const { USER_QUERY } = require('')

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUserMutation($name: String!, $email: String!) {
    updateUser(name: $name, email: $email) {
      name
      email
    }
  }
`


const USER_QUERY = gql`
  {
    user{
      name
      email
    }
  }
`


class Edit extends Component {


    state = {// switch between Login and SignUp
		name: '',
		email: '',

  }

  render() {
	const { name,email } = this.state
    return (
	 <div>
	  <Query query={USER_QUERY}>
        {({ loading, error, data }) => {
          if (loading)
            return <div>Fetching</div>
          if (error)
			return <div>Error</div>
		  const dataUser = data.user
		  //this.setState({ name: dataUser.name })
		  email:dataUser.email
          return (
				<div key={dataUser.id} className="">
					<p>   name :

					<input
                  className="form-control"
                  value={name}
                  onChange={e => this.setState({ name: e.target.value })}
                  type="text"
                  placeholder = {dataUser.name}
                />
					</p>

					<p>   email : {dataUser.email}

					</p>
				</div>
          )
        }}
      </Query>
	  <Mutation
          mutation={UPDATE_USER_MUTATION}
          variables={{ name, email }}
		  //onCompleted={data => this._confirm(data)}
          //onCompleted={() => this.props.history.push('/')}
        >
          {mutation => <button  className="btn btn-lg btn-primary btn-block" id="button"
		  onClick={mutation}//(data => this._confirm(data))
		  >Save</button>}
        </Mutation>

	 </div>
    )
  }




  _confirm = async data => {
    //const { token } = this.state.login ? data.login : data.signup
    //this._saveUserData(token)
	console.log("salut");
    this.props.history.push(`/profile`)
	console.log("va dans profil");
  }

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }

}

export default Edit
