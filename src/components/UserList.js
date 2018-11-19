import React, { Component } from 'react'
import User from './User'
import { AUTH_TOKEN } from '../constants'
import { Mutation } from 'react-apollo'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const USERS_QUERY = gql`
  {
    users {
      id
      name
      email
    }
  }
`



class UserList extends Component {
  render() {
    return (
      <Query query={USERS_QUERY}>
        {({ loading, error, data }) => {
          if (loading)
            return <div>Fetching</div>
          if (error)
            return <div>Error</div>

          const usersToRender = data.users

          return (
            <div>
              {usersToRender.map(user => <User key={user.id} user={user} />)}
            </div>
          )
        }}
      </Query>
    )
  }
}

export default UserList
