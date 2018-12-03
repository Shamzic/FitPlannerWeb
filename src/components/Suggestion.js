import React, { Component } from "react";
import '../styles/MuscleSchema.css'
import { Query } from "react-apollo";
import gql from 'graphql-tag'


const EXO_SUGGEST_QUERY = gql`
  query($suggstfactor:suggstfactor, $orderBy : numberOfUser_DES){
    excercice(suggstfactor: $suggstfactor, orderBy : numberOfUser_DES) {
      name
    }
  }
  `

  
const USER_QUERY = gql`
  {
    user{
	  age
	  city
			
	  weight
	  height
    }
  }
`
  
//const
class Suggestion extends Component {
 state = {
			imc: '',
	}
 render() {
 return(
 <div>
 
 
  <Query query={USER_QUERY}>
        {({ loading, error, data }) => {
          if (loading)
            return <div>Fetching</div>
          if (error)
			return <div>Error</div>
		
		  const dataUser = data.user//({ where: { id : userId  } })
		  const imc=data.user.weight/(data.user.height*data.user.height)
		  this.setState({imc: imc });//'gif/deltoid1.gif'
		}}
	</Query>
		
  <Query query={EXO_SUGGEST_QUERY}>
        {({ loading, error, data }) => {
          if (loading)
            return <div>Fetching</div>
          if (error)
			return <div>Error</div>
		
		const dataEx=data.excercice
		
  if(this.state.imc!=null) {
    //cardExercises =
    <div className="contrainer-fluid">
      <div class="row">
        <div class="col-md-4">
          <div class ="card">
            <img src={this.state.gifExercise} id="topImage" alt="gif" onClick={() => this.openImg(this)}/>
          </div>
        </div>
        <div class="col-md-4">
            <div class ="card">
              <img src={this.state.gifExercise} id="topImage" alt="gif" onClick={() => this.openImg(this)}/>
            </div>
        </div>
        <div class="col-md-4">
          <div class ="card">
            <img src={this.state.gifExercise} id="topImage" alt="gif" onClick={() => this.openImg(this)}/>
          </div>
        </div>
      </div>
    </div>
  }
 
 
 }
}
 </Query>
 </div>
)}
}

export default Suggestion