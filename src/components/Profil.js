import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'
import { Mutation } from 'react-apollo'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
//import Link from './Link'


const USER_QUERY = gql`
  {
    user{
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
    )
  }
}
//<Link to="/edit" className="nav-link">profile</Link>
export default Profil
