import React, { Component } from "react";
import '../styles/MuscleSchema.css'
import { Query } from "react-apollo";
import gql from 'graphql-tag'

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
			suggestfactor: parseFloat(1),
			notsuggt:true
	}
 render() {
var QuerySuggest = ({ suggestfactor }) => (
<Query query={EXO_SUGGEST_QUERY} variables={{suggestfactor}}>
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
							this.setState({suggestfactor: parseFloat(1) });
							this.setState({notsuggt: false });
					}else{
						this.setState({suggestfactor: parseFloat(2) });
						this.setState({notsuggt: false });
					}
					return <div>Suggestion</div>
				}
  		}
		}}
	</Query>
	console.log(suggestfactor)
	console.log({this.state.suggestfactor})
	{this.state.suggestfactor && (
	  <QuerySuggest suggestfactor={this.state.suggestfactor} />
	)}
 </div>
)}
}
//
//
export default Suggestion
