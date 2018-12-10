import React, { Component } from "react";
import '../styles/MuscleSchema.css'
import { Query } from "react-apollo";
import gql from 'graphql-tag'
import { TwitterShareButton  } from "react-simple-share";
import { Link } from 'react-router-dom'
import Caroussel from './Caroussel'

  const MUSCLE_QUERY = gql`
  query($name: String!){
    muscle(name: $name) {
      name
      type
      exercises{
          name
        }
      }
  }
  `




export default class MuscleSchema extends Component {

  constructor(props) {
      super(props);
      this.state = {
        selectedMuscle: null,
        selectedExercise: null,
        gifExercise: null,
        imgBody:'/img/body-empty.png',
        shareLink: '',
        exerciseList: null,
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
        this.setState({gifExercise: 'https://i.imgur.com/iyluOns.gif'}); // lien imgur "Original GIF Link"
        this.setState({selectedExercise: 'curlbiceps'});
          break;
      case 'deltoid':
        this.setState({gifExercise: 'gif/dumbellshoulderdeltoid.gif'});
        this.setState({selectedExercise: 'dumbellshoulderdeltoid'});
          break;
      default :
          this.setState({gifExercise: null});
    }
    this.setState({selectedMuscle: m});
  }



render() {


    const QueryMuscle = ({ name }) => (
      <Query
        query={MUSCLE_QUERY}
        variables = {{ name }}
        >
        {({ loading, error, data }) => {
            //console.log(data);
            if (loading)
              return <div>Fetching...</div>
            if (error)
              return <div>! Error !</div>

            const dataMuscle = data.muscle
            var exerciseList = data.muscle.exercises
            // this.setState({exerciseList: data.muscle.exercises});
            return (
              <div key={dataMuscle.id} className="alert alert-primary">
                <p> <strong>Selected muscle :</strong> {dataMuscle.name}</p>
              <p> <strong>Type :</strong> {dataMuscle.type} </p>
                <div>
                  <h>Liste des exercices associés : </h>
                  <ul>
                      {exerciseList.map(exercise => <li>{exercise.name}</li>)}
                  </ul>


                </div>
              </div>
              )
          }}
        </Query>
      );

  const gifExercise = this.state.gifExercise;
  let cardExercises;

  var items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];



  if(gifExercise!=null) {
    //this.setState({shareLink: window.location.href})
    //console.log("pathname : "+window.location.href);
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
          <Link to={{pathname: "/exercise", state: { exerciseName: this.state.selectedExercise}
          }}>
            <img src={this.state.gifExercise} id="bottomImage" alt="gif"/>
          </Link>
        </div>
      </div>
      <div class="row">
        <TwitterShareButton
           url="https://github.com/Shamzic/FitPlannerWeb/"
           color="#1DA1F2"
           size="40px"
           text={"Come on see my profil and challenge me on this "+ this.state.selectedMuscle+" exercise !"}
           hashtags={"fitplanner,fitchallenge,"+this.state.selectedMuscle}
           via="github"
           related="stephanwozniak ,chillective"
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
                  alt="deltoidLeft" onClick={() => this.ExerciseCards("deltoid")}
                  onMouseOver={() => this.handleMouseOver("deltoid")}
                  onMouseOut={() =>  this.handleMouseOut()}
                />
              <area shape="poly" coords="184,111,187,121,192,129,200,137,207,143,213,148,219,154,225,158,226,145,226,137,226,129,225,124,222,119,218,115,212,113,205,110,197,109"
                alt="deltoidRight" onClick={() => this.ExerciseCards("deltoid")}
                onMouseOver={() => this.handleMouseOver("deltoid")}
                onMouseOut={() =>  this.handleMouseOut()}
              />
              </map>
            </div>
          </div>
          <div class="col">
            <div class="container">
              <div>
                <Caroussel exerciseList={this.state.exerciseList}/>
              </div>
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
