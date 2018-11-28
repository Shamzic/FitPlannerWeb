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
	  firstname
	  lastname
			
	  age
	  city
			
	  weight
	  height
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
            <div className="container text-center" id="main">
              <div class="row justify-content-md-center">
                <div className="col col-lg-4">
    				<div key={dataUser.id} className="">
              	<h4> {dataUser.name}'s profile </h4>
    					<p className="form-control">  Username : {dataUser.name} </p>
    					<p className="form-control">  Email : {dataUser.email} </p>
    					<p className="form-control">  Lastname : {dataUser.lastname} </p>
    					<p className="form-control">  Firstname : {dataUser.firstname} </p>
    					<p className="form-control">  Age : {dataUser.age} </p>
    					<p className="form-control">  City : {dataUser.city} </p>
    					<p className="form-control">  Weight : {dataUser.weight} </p>
    					<p className="form-control">  Height : {dataUser.height} </p>
						<Link to="/edit" className="btn btn-lg btn-primary btn-block"  >edit</Link>
    				</div>
          </div>
        </div>
      </div>
            )
        }}
      </Query>//className="nav-link"//lien a pparait que quandon passe dessu
    )
  }
}

//<Link to="/edit" className="nav-link">profile</Link>
export default Profil
