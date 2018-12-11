import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'


const EXERCISE_QUERY = gql`{
  query{
    exerciseExecutionList{
      id
    }
  }
}
`

// renvoie la liste des liens
export default class Training extends Component {
  render() {
    return (
      <Query query={EXERCISE_QUERY}>
        {({ loading, error, data }) => {
          if (loading)
            return <div>Fetching</div>
          if (error)
            return <div>Error</div>

          const linksToRender = data.exerciseExecutionList

          return (
            <div>
             {linksToRender.map(link => <p> {link.id} </p>)}
            </div>
          )
        }}
      </Query>
    )
  }
}
