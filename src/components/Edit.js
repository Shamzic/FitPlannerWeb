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
	  firstname
	  lastname

	  age
	  city

	  weight
	  height
    }
  }
`


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



   function previewFile(){
       var preview = document.querySelector('img'); //selects the query named img
       var file    = document.querySelector('input[type=file]').files[0]; //sames as here
       var reader  = new FileReader();

       reader.onloadend = function () {
           preview.src = reader.result;
       }

       if (file) {
           reader.readAsDataURL(file); //reads the data as a URL
       } else {
           preview.src = "";
       }
   }

  //previewFile();  //calls the function named previewFile()



// const uploadImg=(image)=>({
		// const nom1 =md5(uniqid(rand(),true));
        // const nom="Images/album/fichier".$idef."/$nom1";
        // const resultat=move_uploaded_file(image['tmp_name'], nom);
// });



class Edit extends Component {


    state = {
			name: '',
			email: '',
			firstname: '',
			lastname: '',

			age: '',
			city: '',

			weight: '',
			height: '',
			id:'cjonjhuq0jllf0a64864l79sr',
			photo:''
	}

			  //onchange="previewFile()"

  render() {

  return (

	 <div>
     <div className="container text-center" id="main">
       <div class="row justify-content-md-center">
         <div className="col col-lg-4">
	  <Query query={USER_QUERY}>
        {({ loading, error, data }) => {
          if (loading)
            return <div>Fetching</div>
          if (error)
			return <div>Error</div>

		  const dataUser = data.user
		  //'https://i.imgur.com/iyluOns.gif'
//<img src="" height="200" alt="Image preview..."/>
//<script src="ImgurUpload.js"></script>
//<input type="submit" value="Upload File" name="submit"/>
          return (
				<div key={dataUser.id} className="">

					<img id="profile" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgWIeOetiqZ-0WQvax0oLpXaGVWgEIgIpc-bfWykRjNrv1Gonu' alt="profile"  height="120"/>

					<html>
					<form>
						<input name="myFile" type="file" required/>
						<button type="submit">Submit</button>
					</form>
					</html>



					<p><strong> Name :</strong>
					<input
                  className="form-control"
                  value={this.state.name}
                  onChange={e => this.setState({ name: e.target.value})}
                  type="text"
                  placeholder = {dataUser.name}
                />
					</p>

					<p> <strong>  Email :</strong>
						<input
                  className="form-control"
                  value={this.state.email}
                  onChange={e => this.setState({ email: e.target.value})}
                  type="text"
                  placeholder = {dataUser.email}
                />
					</p>

					<p> <strong>  Lastname :</strong>
						<input
                  className="form-control"
                  value={this.state.lastname}
                  onChange={e => this.setState({ lastname: e.target.value})}
                  type="text"
                  placeholder = {dataUser.lastname}
                />
					</p>

					<p> <strong>  Firstname :</strong>
						<input
                  className="form-control"
                  value={this.state.firstname}
                  onChange={e => this.setState({ firstname: e.target.value})}
                  type="text"
                  placeholder = {dataUser.firstname}
                />
					</p>

					<p> <strong>  Age :</strong>
						<input
                  className="form-control"
                  value={this.state.age.substring(0,10)}
                  onChange={e => this.setState({ age: e.target.value})}
                  type="date"
                  placeholder = {dataUser.age.substring(0,10)}
                />
					</p>

					<p> <strong>  City :</strong>
						<input
                  className="form-control"
                  value={this.state.city}
                  onChange={e => this.setState({ city: e.target.value})}
                  type="text"
                  placeholder = {dataUser.city}
                />
					</p>

					<p> <strong>  Weight :</strong>
						<input
                  className="form-control"
                  value={this.state.weight}
                  onChange={e => this.setState({ weight: parseFloat(e.target.value)})}
                  type="number"
                  placeholder = {dataUser.weight}
                />
					</p>

					<p> <strong>  Height :</strong>
						<input
                  className="form-control"
                  value={this.state.height}
                  onChange={e => this.setState({ height: parseFloat(e.target.value)})}
                  type="number"
                  placeholder = {dataUser.height}
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
    "firstname" : this.state.firstname ,
    "lastname" : this.state.lastname ,
    "age" : this.state.age ,
    "city" : this.state.city ,
    "weight" : parseFloat(this.state.weight) ,
    "height" : parseFloat(this.state.height) ,
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
   </div>
   </div>
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

//placeholder = {dataUser.age.substring(0,10)}//pour la date

export default Edit
