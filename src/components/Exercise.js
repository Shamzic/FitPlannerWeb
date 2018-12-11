import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import '../styles/Exercise.css'


const EXERCISE_QUERY = gql`
  query($exerciseName: String!){
    exercise(name: $exerciseName){
    id
    name
    imageUrl
    muscle {
        id
        name
        type
      }
    }
  }
`
const POST_MUTATION = gql`
  mutation PostMutation($exercisename: String!, $series: Float!,  $repetitions: Float!)
    {
      postExerciseExecution(exercisename: $exercisename, series: $series,  repetitions: $repetitions)
       {
          id
          createdAt
          series
          repetitions
          exercise {
            id
            name
          }
          user {
            id
            name
          }
        }
    }
`

class Exercise extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    exercisename: this.props.location.state.exerciseName,
    series: '10',
    repetitions: '10',
  }

  render() {
    const { exercisename, series, repetitions } = this.state
    const { exerciseName } = this.props.location.state
    return (
    	<div id="exercise">
        <Query query={EXERCISE_QUERY} variables={{exerciseName }}>
          {({ loading, error, data }) => {
            if (loading)
              return <div>Fetching</div>
            if (error)
              return <div>Error</div>
            else {
              return (
                <div key={data.id}>
                  <h3> Exercise name: {data.exercise.name}</h3>
                  <div class="card" >
                    <img id="exercisecard" src= {data.exercise.imageUrl}/>
                  </div>
                  <hr/>
                  <h3>Add this exercise to your program</h3>
                  <div>
                    <div className="form-group col-md-3">
                      <label>Series</label>
                      <input
                        className="form-control"
                        value={series}
                        onChange={e => this.setState({ series: e.target.value })}
                        type="number"
                        placeholder="Number of Series"
                      />
                    <label>Repetitions</label>
                      <input
                        className="form-control"
                        value={repetitions}
                        onChange={e => this.setState({ repetitions: e.target.value })}
                        type="number"
                        placeholder="Number of Reps"
                      />

                    <Mutation
                      mutation={POST_MUTATION}
                      variables={{ exercisename, series, repetitions }}
                      onCompleted={() => this.props.history.push('/')}
                    >
                      {postMutation => <button className="btn btn-outline-success col-md-12" onClick={postMutation}>Submit</button>}
                    </Mutation>
                    </div>
                  </div>
                </div>

              )
            }

          }}
        </Query>
    	</div>
  )}
}


export default Exercise
