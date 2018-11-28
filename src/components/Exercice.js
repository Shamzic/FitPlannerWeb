import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'


const EXERCICES_QUERY = gql`
  {
    exercice{
      name
      id
      Muscle {
        id
        name
        type
      }
    }
  }
`



class Exercice extends Component {
  render() {
    return (

      <Query query={EXERCICES_QUERY}>
          {({ loading, error, data }) => {
            if (loading)
              return <div>Fetching</div>
            if (error)
        return <div>Error</div>

        const dataExercice = data.exercice
            return (
                <div key={dataExercice.id}>

                    <h3> Exercice name: {dataExercice.name} </h3>
                    /*<ul>
                      <li> Exercice name: {dataExercice.name} /li>
                      </li>
                    </ul>*/



                </div>
                )
            }}
          </Query>


    )
  }
}

export default Exercice
