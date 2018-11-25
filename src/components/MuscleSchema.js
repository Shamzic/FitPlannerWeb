import React, { Component } from "react";
import '../styles/MuscleSchema.css'
import { Query } from "react-apollo";
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
            return <div>Error</div>

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

  constructor(props) {
      super(props);
      this.state = {
        selectedMuscle: null,
        imgBody:'/img/body-empty.png'
      };
    }

  handleMouseOver(muscle) {
    switch(muscle) {
      case 'biceps': this.setState({imgBody: 'img/body-biceps.png'});
          break;
      case 'deltoid': this.setState({imgBody: 'img/body-deltoid.png'});
          break;
      default : this.setState({imgBody: 'img/body-empty.png'});
    }
  }

  handleMouseOut() {
     this.setState({imgBody: 'img/body-empty.png'})
  }


  onMuscleSelected = ({ target }) => {
    this.setState(() => ({ selectedMuscle: target.value }));
  };

  bicepsExerciseCards(m) {
    this.setState({selectedMuscle: m});
  }

  hover() {
   //var object = document.getElementById("bodymage").style.width = "20%";
   var object = document.getElementById('bodymage');
   object.src =  '../assets/img/body-biceps.png';

}

render() {
    return (
      <div className="container">
        <div className="text-center">
        <img id="bodymage" src={this.state.imgBody} alt="responsive" className="img-fluid mx-auto d-block" useMap="#musclemap"/>
          <map name="musclemap" >
            <area shape="poly" coords="75,138,58,152,50,160,46,177,46,195,52,206,53,215,60,215,67,216,75,203,81,190,84,180,84,170,84,163,83,158,78,143"
              alt="bicepsLeft"
              onClick={() => this.bicepsExerciseCards("biceps")}
              onMouseOver={() => this.handleMouseOver("biceps")}
              onMouseOut={() =>  this.handleMouseOut()}
            />
            <area shape="poly" coords="197,138,196,149,192,158,191,166,191,176,192,183,195,194,204,212,207,215,218,214,221,214,222,208,227,197,227,187,227,169,224,159,212,148,202,140,200,138"
              alt="bicepsRight"
              onClick={() => this.bicepsExerciseCards("biceps")}
              onMouseOver={() => this.handleMouseOver("biceps")}
              onMouseOut={() =>  this.handleMouseOut()}
            />
            <area shape="poly" coords="64,111,78,109,90,111,88,123,77,136,50,159,48,145,49,130,51,120"
              alt="deltoideLeft" onClick={() => this.bicepsExerciseCards("deltoïde")}
              onMouseOver={() => this.handleMouseOver("deltoid")}
              onMouseOut={() =>  this.handleMouseOut()}
            />
          <area shape="poly" coords="184,111,187,121,192,129,200,137,207,143,213,148,219,154,225,158,226,145,226,137,226,129,225,124,222,119,218,115,212,113,205,110,197,109"
            alt="deltoideRight" onClick={() => this.bicepsExerciseCards("deltoïde")}
            onMouseOver={() => this.handleMouseOver("deltoid")}
            onMouseOut={() =>  this.handleMouseOut()}
          />
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
