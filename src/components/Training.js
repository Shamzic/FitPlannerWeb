import React, { Component } from 'react'
import { Query } from 'react-apollo'
import Link from './Link'
import gql from 'graphql-tag'
import '../styles/Training.css'

const EXERCISE_QUERY = gql`
{
  query {
    exerciseExecutionList{
      id
      user{
        id
        name
      }
      exercise {
        id
        name
      }
    }
  }
}
`
const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        createdAt
        url
        description
      }
      exerciseExecutions {
        id
        series
        repetitions
        user {
          id
          name
        }
        exercise {
          id
          name
        }
      }
    }
  }
`

// renvoie la liste des liens
export default class Training extends Component {
  render() {
    return (
      <div id="training">
      <Query query={FEED_QUERY}>
        {({ loading, error, data }) => {
          if (loading)
            return <div>Fetching</div>
          if (error)
            return <div>Error</div>

          const linksToRender = data.feed.exerciseExecutions
          console.log(linksToRender);
          return (
            <div>
              <h3> My training</h3>
              <hr/>
            {linksToRender.map(link =>
              <div >
                <p>{link.exercise.name} | Series : {link.series} | Repetitions : {link.repetitions}</p>
                <hr/>
              </div>
            )}
            </div>
          )
        }}
      </Query>
    </div>
    )
  }
}
