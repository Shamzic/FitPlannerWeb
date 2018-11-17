import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'
import { Mutation } from 'react-apollo'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Link from './Link'


const USER_QUERY = gql`
  {
    user{
      id
      name
      email
    }
  }
`



class Profil extends Component {
	
  render() {
    //const { id, email, password, name } = this.state
	//const dataUser = data.users
    return (

	 //<div>
	 //<h> profil </h>
	 //<div className="">
	  <Query query={USER_QUERY}>
        {({ loading, error, data }) => {
          //if (loading) 
            //return <div>Fetching</div>
          //if (error) 
			return <div>Error</div>
		  //return <div>data</div>
          const dataUser = data.user

          return (
            <div>
              {dataUser.map(user => ( //linksToRender
				<div key={user.id}> 
					<p> un user </p>
					<p>name : `user.name`</p>
					<p>email : `user.email`</p>
				</div>
			  ))}
            </div>
          )
        }}
      </Query>
	 //</div>
	 //<h> profil </h>
	 //</div>
    )
  }
}

export default Profil