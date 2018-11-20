import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const USER_QUERY = gql`
  {
    user{
      name
      email
    }
  }
`

class Profile extends Component {



  render() {

    return (

	  <Query query={USER_QUERY} >
        {({ loading, error, data }) => {

          if (loading)
            return <div>Fetching</div>
          if (error)
			      return <div>Error</div>

          const dataUser = data.user
          return (
    				<div key={dataUser.id} className="">
              	<h3>   Profile User </h3>
    					<p>   Name : {dataUser.name} </p>
    					<p>   Email : {dataUser.email} </p>
    				</div>
            )
        }}
      </Query>
    )
  }
}

export default Profile
