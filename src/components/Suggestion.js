import React, { Component } from "react";
import '../styles/MuscleSchema.css'
import { Query } from "react-apollo";
import gql from 'graphql-tag'




const EXO_SUGGEST_QUERY = gql`
	query($suggstfactor:suggstfactor){
		suggst(suggstfactor: $suggstfactor) {
			name
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

//const
class Suggestion extends Component {
 state = {
			imc: '',
			gifExercise:'',
			suggestfactor:1,
			notsuggt:true
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
		  console.log(data.user)
		  const dataUser = data.user
		  if(data.user.height!=null & data.user.weight!=null){
			const imc=data.user.weight/(data.user.height*data.user.height)
			console.log({imc})
			if(imc!=null){
				if(this.state.notsuggt)
					if (imc<20){
						this.setState({suggestfactor: 1 });
						this.setState({notsuggt: false });
				}else{
					this.setState({suggestfactor: 1 });
					this.setState({notsuggt: false });
				}
				return <div>Suggestion</div>
			}

		  }
		}}
	</Query>
	console.log({this.state.suggestfactor})
	<Query query={EXO_SUGGEST_QUERY}>
        {({ loading, error, data }) => {
          if (loading)
            return <div>Fetching</div>
          if (error)
			return <div>Error</div>

		const dataEx=data.excercice
		this.setState({gifExercise: dataEx.name });//'gif/deltoid1.gif'
  if(this.state.suggestfactor!=null) {
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
