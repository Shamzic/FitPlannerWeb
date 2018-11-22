import React, { Component } from "react";
import { render } from "react-dom";

import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";

import '../styles/MuscleSchema.css'
import body from '../assets/body.png';

import gql from 'graphql-tag'

  const MUSCLE_QUERY = gql`
  query($name: String!){
    muscle(name: $name) {
      name
      type
      }
  }
  `

  const QueryMuscle = ({ name }) => (
    <Query
      query={MUSCLE_QUERY}
      variables = {{ name }}
      >
        {({ loading, error, data }) => {
          console.log(data);
          if (loading)
            return <div>Fetching</div>
          if (error)
            return <div>Error</ div>

          const dataMuscle = data.muscle

          return (
            <div key={dataMuscle.id} className="alert alert-primary">
              <p> Selected muscle : {dataMuscle.name}</p>
              <p> Type : {dataMuscle.type} </p>
            </div>
            )
        }}
      </Query>
    );

class MuscleSchema extends Component {

  state = { selectedMuscle: null };

  onMuscleSelected = ({ target }) => {
    this.setState(() => ({ selectedMuscle: target.value }));
  };

  bicepsExerciseCards(m) {
    this.setState({selectedMuscle: m});
  }

render() {
    return (
      <div className="container">
        <div className="text-center">
          <img src={body} alt="responsive" className="img-fluid mx-auto d-block" useMap="#musclemap"/>
          <map name="musclemap">
            <area shape="poly" coords="231,140,260,161,262,183,257,203,257,215,242,214,224,177,225,165,230,149" alt="biceps" onClick={() => this.bicepsExerciseCards("biceps")}/>
            <area shape="poly" coords="111,140,81,161,81,192,90,214,100,216,115,188,120,168" alt="biceps" onClick={() => this.bicepsExerciseCards("biceps")}/>
            <area shape="poly" coords="100,110,118,110,126,112,122,122,111,136,102,144,95,151,84,160,81,138,85,121" alt="deltoide" onClick={() => this.bicepsExerciseCards("deltoïde")}/>
          </map>
            {this.state.selectedMuscle && (
                <QueryMuscle name={this.state.selectedMuscle} />
              )}
        </div>
      </div>
    )
  }
}

export default MuscleSchema;
