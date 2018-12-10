import React, { Component } from 'react'
import '../styles/Caroussel.css'
import Item from './Item'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Query } from "react-apollo";
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'

const MUSCLE_QUERY = gql`
query($name: String!){
  muscle(name: $name) {
    name
    type
    exercises{
        name
        imageUrl
      }
    }
}
`

export default class Caroussel extends Component {

    constructor(props) {
        super(props)
        this.state = {
          selectedExerciseName: null,
          selectedExerciseImageUrl: null
        }
    }

    imageClick(musclename, imageUrl){
      this.setState({selectedExerciseName: musclename}),
      this.setState({selectedExerciseImageUrl: imageUrl}),
      console.log("selectedExerciseImageUrl : "+this.state.selectedExerciseImageUrl)
      console.log("selectedExerciseName : "+this.state.selectedExerciseName)
    }

    render(){
      const name = this.props.selectedMuscle
      let secondRow = null;

      if(this.state.selectedExerciseName!=null){
        secondRow = 
        <div class="row">
          <div class ="card" id="bottomCard">
              <Link to={{pathname: "/exercise", state: { exerciseName: this.state.selectedExerciseName}
              }}>
                <img src={this.state.selectedExerciseImageUrl} id="bottomImage" alt="gif"/>
              </Link>
          </div>
        </div>
      }
        return (
          <div className="contrainer-fluid">
            <Query
              query={MUSCLE_QUERY}
              variables = {{ name }}
              >
              {({ loading, error, data }) => {
                  if (loading)
                    return <div>Fetching...</div>
                  if (error)
                    return <div>! Error !</div>

              if( this.state.selectedExercise ==  null) {
                return (
                  <div name="exercise" onChange={{name}}>
                      <div class="row">
                        {data.muscle.exercises.map(exercise => (
                              <div class="col-md-4">
                                <div class ="card">
                                  <img id ="topImage" key={exercise.id} src={exercise.imageUrl} onClick={(e) => this.imageClick(exercise.name, exercise.imageUrl)}/>
                            </div>
                          </div>
                        ))}
                      </div>
                      {secondRow}
                    </div>
                  );
                }
                }}
              </Query>
            </div>
          )
      }
    }
