import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'


const EXERCISES_QUERY = gql`
  query($name: String!){
    exercice(name: $name){
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

const QueryEx = ({ name }) => (
    <Query query={EXERCISES_QUERY} variables={{name}}>
          {({ loading, error, data }) => {
			if (loading)
              return <div>Fetching</div>
            if (error)

              return <div>Error</div>

        const dataExercice = data.exercice
            return (
                <div key={dataExercice.id}>
                    <h3> Exercise name: {dataExercice.name} </h3>
                    <ul>
                      <li> Exercise name: {dataExercice.name} </li>
					            <li> Muscle name: {dataExercice.muscle.name} </li>
                    </ul>
                </div>
                )
            }}
    </Query>
);

class Exercice extends Component {
  state={
	  name:"biceps"
  };

  render() {
    return (
	<div>

		<QueryEx name={this.state.name} />

	</div>
  )}
}


export default Exercice
