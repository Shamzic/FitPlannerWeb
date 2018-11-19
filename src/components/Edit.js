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
    post(name: $name, email: $email) {
      id
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
	
  render() {
    return (
	 <div>
	  <Query query={USER_QUERY}>
        {({ loading, error, data }) => {
          if (loading) 
            return <div>Fetching</div>
          if (error) 
			return <div>Error</div>
		
          const dataUser = data.user

          return (
				<div key={dataUser.id} className=""> 
					<p>   name : {dataUser.name} 
					</p>
					<p>   email : {dataUser.email} 
					</p>
				</div>
          )
        }}
      </Query>
	  <Mutation
          mutation={UPDATE_USER_MUTATION}
          //variables={{ name, email }}
          onCompleted={() => this.props.history.push('/')}
        >
          {updateUserMutation => <button onClick={updateUserMutation}>Save</button>}
        </Mutation>
	  
	 </div>
    )
  }
}





function updateUser(user) {
  const tmpUser = {};

  if(user.name) tmpUser.name = user.name;
  if(user.email) tmpUser.email = user.email;

  /*return knex('authors')
  .where('user_id', user.id)
  .update(tmpUser)
  .returning('*');*/
  
  return(
      <Query query={USER_QUERY}>
        {({ loading, error, data }) => {
          if (loading) 
            return <div>Fetching</div>
          if (error) 
			return <div>Error</div>
		
          const dataUser = data.user
          
        }}
      </Query>
  )
}




export default Edit