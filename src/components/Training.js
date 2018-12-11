import React, { Component } from 'react'
import { Query } from 'react-apollo'
import Link from './Link'
import gql from 'graphql-tag'
import '../styles/Training.css'
import { TwitterShareButton  } from "react-simple-share";

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
                <p> <div id="listedExercise">{link.exercise.name}</div> | Series : {link.series} | Repetitions : {link.repetitions} |
                <TwitterShareButton
                   url="https://github.com/Shamzic/FitPlannerWeb/"
                   color="#1DA1F2"
                   size="40px"
                   text={"Come on see my profil and challenge me on this "+ link.exercise.name+" exercise !"}
                   hashtags={"fitplanner,fitchallenge,"+link.exercise.name}
                   via="github"
                   related="stephanwozniak ,chillective"
                  />
              </p>
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
