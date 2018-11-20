import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const MUSCLE_QUERY = gql`
{
  muscle {
    name
    type
    }
}`

class SelectedMuscle extends Component {

  constructor(props) {
    super(props)
  }


  render() {
    return (
      <Query query={MUSCLE_QUERY}>
          {({ loading, error, data }) => {
            console.log(data);
            if (loading)
              return <div>Fetching</div>
            if (error)
              return <div>Error</div>

            const dataMuscle = data.muscle

            return (
              <div key={dataMuscle.id} className="">
                <p> Name : {dataMuscle.name} </p>
                <p> Type : {dataMuscle.type} </p>
              <p> Selected muscle : {this.props.muscle}</p>
              </div>
              )
          }}
        </Query>
      )
    }
}


export default SelectedMuscle;
