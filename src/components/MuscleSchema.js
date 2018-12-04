import React, { Component } from "react";
import '../styles/MuscleSchema.css'
import { Query } from "react-apollo";
import gql from 'graphql-tag'
import { FacebookShareButton } from "react-simple-share";
import { Link } from 'react-router-dom'

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
            return <div>Fetching...</div>
          if (error)
            return <div>! Error !</div>

          const dataMuscle = data.muscle

          return (
            <div key={dataMuscle.id} className="alert alert-primary">
              <p> <strong>Selected muscle :</strong> {dataMuscle.name}</p>
            <p> <strong>Type :</strong> {dataMuscle.type} </p>
            </div>
            )
        }}
      </Query>
    );

export default class MuscleSchema extends Component {

  constructor(props) {
      super(props);
      this.state = {
        selectedMuscle: null,
        selectedExercise: null,
        gifExercise: null,
        imgBody:'/img/body-empty.png',
        shareLink: '',
        redirect: null
      };
    }

  handleMouseOver(muscle) {
    switch(muscle) {
      case 'biceps':
        this.setState({imgBody: 'img/body-biceps.png'});
          break;
      case 'deltoid':
        this.setState({imgBody: 'img/body-deltoid.png'});
          break;
      default :
          this.setState({imgBody: 'img/body-empty.png'});
    }
  }

  handleMouseOut() {
     this.setState({imgBody: 'img/body-empty.png'})
  }


  ExerciseCards(m) {
    switch(m) {
      case 'biceps':
        this.setState({gifExercise: 'gif/biceps1.gif'});
          break;
      case 'deltoïde':
        this.setState({gifExercise: 'gif/deltoid1.gif'});
          break;
      default :
          this.setState({gifExercise: null});
    }
    this.setState({selectedMuscle: m});
  }

render() {

  var divStyle = {
    width: '100%',
  }
  const gifExercise = this.state.gifExercise;
  let cardExercises;
  let redirect = this.state.redirect;

  if(redirect == true) {
    const selectedMuscle = this.state.selectedMuscle;
    return   <Link to="/about"></Link>
      // (<Link to={{ pathname: "/exercise", state: {
      //     name: selectedMuscle
      //   }}}/>)
    // return <Redirect push to={"/exercise",  state: {name: this.state.selectedMuscle}}  />;
  }

  if(gifExercise!=null) {
    this.state.shareLink = window.location.href;
    console.log("pathname : "+window.location.href);
    cardExercises =
    <div className="contrainer-fluid">
      <div class="row">
        <div class="col-md-4">
          <div class ="card">
            <img src={this.state.gifExercise} id="topImage" alt="gif"/>
          </div>
        </div>
        <div class="col-md-4">
            <div class ="card">
              <img src={this.state.gifExercise} id="topImage" alt="gif"/>
            </div>
        </div>
        <div class="col-md-4">
          <div class ="card">
            <img src={this.state.gifExercise} id="topImage" alt="gif"/>
          </div>
        </div>
      </div>
      <div class="row">
        <div class ="card" id="bottomCard">
          <Link to={{pathname: "/exercise", state : {
              name: this.state.selectedMuscle
            }}}>
            <img src={this.state.gifExercise} id="bottomImage" alt="gif"/>
          </Link>
        </div>
      </div>
      <div class="row">
          <FacebookShareButton
            url={this.state.shareLink}
            color="#3B5998"
            size="40px"
          />
      </div>
    </div>
  }

    return (
      <div className="container" id="body">
      <div class="row">
          <div class="col">
            <div className="text-center">
            <img id="bodymage" src={this.state.imgBody} alt="responsive" className="img-fluid mx-auto d-block" useMap="#musclemap"/>
              <map name="musclemap" >
                <area shape="poly" coords="75,138,58,152,50,160,46,177,46,195,52,206,53,215,60,215,67,216,75,203,81,190,84,180,84,170,84,163,83,158,78,143"
                  alt="bicepsLeft"
                  onClick={() => this.ExerciseCards("biceps")}
                  onMouseOver={() => this.handleMouseOver("biceps")}
                  onMouseOut={() =>  this.handleMouseOut()}
                />
                <area shape="poly" coords="197,138,196,149,192,158,191,166,191,176,192,183,195,194,204,212,207,215,218,214,221,214,222,208,227,197,227,187,227,169,224,159,212,148,202,140,200,138"
                  alt="bicepsRight"
                  onClick={() => this.ExerciseCards("biceps")}
                  onMouseOver={() => this.handleMouseOver("biceps")}
                  onMouseOut={() =>  this.handleMouseOut()}
                />
                <area shape="poly" coords="64,111,78,109,90,111,88,123,77,136,50,159,48,145,49,130,51,120"
                  alt="deltoideLeft" onClick={() => this.ExerciseCards("deltoïde")}
                  onMouseOver={() => this.handleMouseOver("deltoid")}
                  onMouseOut={() =>  this.handleMouseOut()}
                />
              <area shape="poly" coords="184,111,187,121,192,129,200,137,207,143,213,148,219,154,225,158,226,145,226,137,226,129,225,124,222,119,218,115,212,113,205,110,197,109"
                alt="deltoideRight" onClick={() => this.ExerciseCards("deltoïde")}
                onMouseOver={() => this.handleMouseOver("deltoid")}
                onMouseOut={() =>  this.handleMouseOut()}
              />
              </map>
            </div>
          </div>
          <div class="col">
            <div class="container">
              <div class="row">
			  {this.state.selectedMuscle}
                {this.state.selectedMuscle && (
                    <QueryMuscle name={this.state.selectedMuscle} />
                  )}
            </div>
              <div class="row">
                {cardExercises}
              </div>
            </div>
          </div>
      </div>
    </div>
    )
  }
}
