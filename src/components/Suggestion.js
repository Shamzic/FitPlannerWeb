import React, { Component } from "react";
import '../styles/MuscleSchema.css'
import { Query } from "react-apollo";
import gql from 'graphql-tag'
import { AUTH_TOKEN } from '../constants'

const EXO_SUGGEST_QUERY = gql`
	query($suggstfactor:Float){
		suggst(suggstfactor: $suggstfactor) {
			names
			urls

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






class Suggestion extends Component {


     imageClick(musclename, imageUrl){
      this.setState({selectedExerciseName: musclename}),
      this.setState({selectedExerciseImageUrl: imageUrl}),
      console.log("selectedExerciseImageUrl : "+this.state.selectedExerciseImageUrl)
      console.log("selectedExerciseName : "+this.state.selectedExerciseName)
    }


state = {
			imc: '',
			gifExercise:'',
			suggestfactor: '1',
			notsuggt:true
	}
 render() {
	     const authToken = localStorage.getItem(AUTH_TOKEN)
var QuerySuggest = ({ suggstfactor }) => (
<Query query={EXO_SUGGEST_QUERY} variables={{suggstfactor}}>
      {({ loading, error, data }) => {
        if (loading)
          return <div>Fetching</div>
        if (error)
			return <div>Error</div>
		var names=data.suggst.names;
		var urls=data.suggst.urls;

		return (

			    <div className="contrainer-fluid">
			      <div class="row">
			        <div class="col-md-4">
			          <div class ="card">
			            <img src={urls[0]} id="topImage" alt="gif" onClick={(e) => this.imageClick(names[0], urls[0])}/>
			          </div>
			        </div>
			        <div class="col-md-4">
			            <div class ="card">
			              <img src={urls[1]} id="topImage" alt="gif"  onClick={(e) => this.imageClick(names[1], urls[1])}/>
			            </div>
			        </div>
			        <div class="col-md-4">
			          <div class ="card">
			            <img src={urls[2]} id="topImage" alt="gif" onClick={(e) => this.imageClick(names[2], urls[2])}/>
			          </div>
			        </div>
			      </div>
			    </div>
		);
 		}
}
 </Query>
)
if(authToken)
 return(

 <div>
  <Query query={USER_QUERY}>
    {({ loading, error, data }) => {
      if (loading)
        return <div>Fetching</div>
      if (error)
				return <div>Error</div>
		  if(data.user.height!=null & data.user.weight!=null){
				const imc=data.user.weight/(data.user.height*data.user.height)
				if(imc!=null){
					if(this.state.notsuggt)
						if (imc<20){
							this.setState({suggestfactor: '1' });
							this.setState({notsuggt: false });
					}else{
						this.setState({suggestfactor:'2' });
						this.setState({notsuggt: false });
					}
					return <div><h3>Suggestions</h3><hr/></div>
				}
  		}
		}}
	</Query>
	{this.state.suggestfactor && (
	  <QuerySuggest suggstfactor={this.state.suggestfactor} />
	)}
 </div>
)
	else return null
}
}
//
//
export default Suggestion
