import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'
//import { USER_QUERY } from './Profil'
import { Mutation } from 'react-apollo'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'


const UPDATE_USER_MUTATION = gql`
  mutation UpdateUserMutation($data: UserUpdateInput!, $where: UserWhereUniqueInput!) { 
    updateUser(data: $data, where: $where) {
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
/*
  const MutationUpdateUser=( {name , email}) => (//, {id}
	<Mutation
          mutation={UPDATE_USER_MUTATION}
          variables={{
  "data":{
    "email": email,
    "name" : name ,
  },
  "where": {"id":'cjonjhuq0jllf0a64864l79sr'}
  
}}
		  //variables={{data}, {where}}//{name,email }
		  //onCompleted={data => this._confirm(data)}
          onCompleted={() => Edit.props.history.push(`/profile`)}
        >
          {updateUserMutation => <button  className="btn btn-lg btn-primary btn-block" id="button"
		  onClick={updateUserMutation}//(data => this._confirm(data))
		  >Save </button>}
    </Mutation>
  );
*/
class Edit extends Component {


    state = {
			name: '',
			email: '',
			id:'cjonjhuq0jllf0a64864l79sr'
	}



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
				
					<p>   name :

					<input
                  className="form-control"
                  value={this.state.name}
                  onChange={e => this.setState({ name: e.target.value})}
                  type="text"
                  placeholder = {dataUser.name}
                />
					</p>

					<p>   email :
						<input
                  className="form-control"
                  value={this.state.email}
                  onChange={e => this.setState({ email: e.target.value})} 
                  type="text"
                  placeholder = {dataUser.email}
                />
					</p>

				</div>
          )

		  

        }}
      </Query>
	  
	  <Mutation
          mutation={UPDATE_USER_MUTATION}
          variables={{
  "data":{
    "email": this.state.email,
    "name" : this.state.name ,
  },
  "where": {"id":'cjonjhuq0jllf0a64864l79sr'}
  
}}
		  //variables={{data}, {where}}//{name,email }
		  onCompleted={data => this._confirm(data)}
          //onCompleted={() => this.props.history.push(`/profile`)}//, window.location.reload()
        >
          {updateUserMutation => <button  className="btn btn-lg btn-primary btn-block" id="button"
		  onClick={updateUserMutation}
		  >Save </button>}
    </Mutation>
	  
	  
	  
	 </div>
    )
  }
//<MutationUpdateUser name={this.state.name} email={this.state.email}    />



  _confirm = async data => {
    //const { token } = this.state.login ? data.login : data.signup
    //this._saveUserData(token)
    this.props.history.push(`/profile`)
	window.location.reload()
	
  }
  
  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
	
  }

}
  

  
export default Edit
