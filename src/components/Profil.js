import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
//import Link from './Link'
import { Link } from 'react-router-dom'

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
    return (

	  <Query query={USER_QUERY}>
        {({ loading, error, data }) => {

          if (loading)
            return <div>Fetching</div>
          if (error)
			      return <div>Error</div>

          const dataUser = data.user
          return (
    				<div key={dataUser.id} className="">
    					<p>   name : {dataUser.name} </p>
    					<p>   email : {dataUser.email}  </p>
						<Link to="/edit" >edit</Link>
    				</div>
            )
        }}
      </Query>//className="nav-link"//lien a pparait que quandon passe dessu
    )
  }
}
<Link to="/edit" className="nav-link">profile</Link>
export default Profil
