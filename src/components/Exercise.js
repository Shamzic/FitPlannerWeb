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
        <hr/>
        <h3>Add this exercise to your program</h3>
        <form>
          <div className="form-group col-md-3">
            <label for="repetitions">Repetitions</label>
            <input type="number" className="form-control" id="repetitions" ></input>
          </div>
          <div className="form-group col-md-3">
            <label for="series">Series</label>
            <input type="number" className="form-control" id="series" ></input>
          </div>
          <div className="form-group col-md-3 ">
            <label for="date">Date</label>
            <input type="date" className="form-control" id="date" ></input>
          </div>
          <button type="submit" className="btn btn-outline-success">
            Add
          </button>
        </form>
    	</div>
  )}
}


export default Exercise
