import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import '../styles/Exercise.css'


const EXERCISE_QUERY = gql`
  query($name: String!){
    exercise(name: $name){
    id
    name
    muscle {
        id
        name
        type
      }
    }
  }
`

const QueryExecution = ({ name }) => (
<Query query={EXERCISE_QUERY} variables={{name}}>
  {({ loading, error, data }) => {
    if (loading)
      return <div>Fetching</div>
    if (error)
      return <div>Error</div>

    return (
      <div key={data.id}>
      <h3> Exercise name: {data.exercise.name} </h3>
      <ul>
        <li> Muscle used : {data.exercise.muscle.name} </li>
        {/*<li> Muscle name: {dataExercise.muscle.name} </li>*/}
      </ul>
      </div>
    )
  }}
</Query>
);

class Exercise extends Component {

  constructor(props) {
    super(props);
  }
  render() {
    const {exerciseName} = this.props.location.state
    return (
    	<div id="exercise">
    		<QueryExecution name={exerciseName}/>
    	</div>
  )}
}


export default Exercise
