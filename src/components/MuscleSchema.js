import React, { Component } from 'react'
import '../styles/MuscleSchema.css'
import body from '../assets/body.png';
import SelectedMuscle from './SelectedMuscle'

class MuscleSchema extends Component {

  constructor(props) {
    super(props)
    this.state = {selectedMuscle: ' '};
  }
  /* I founded exact coordonates with this tool : http://imagemap-generator.dariodomi.de/*/
  bicepsExerciseCards(m) {
    //alert('You clicked on the biceps !');
     console.log("you clicked on the "+m)
    this.setState({
      selectedMuscle: m
    });
  }



  render() {

    return (
      <div className="container">
        <div className="text-center">
          <img src={body} alt="responsive" className="img-fluid mx-auto d-block" useMap="#musclemap"/>
          <map name="musclemap">
            <area shape="poly" coords="231,140,260,161,262,183,257,203,257,215,242,214,224,177,225,165,230,149" alt="biceps" onClick={() => this.bicepsExerciseCards("biceps")}/>
            <area shape="poly" coords="111,140,81,161,81,192,90,214,100,216,115,188,120,168" alt="biceps" onClick={() => this.bicepsExerciseCards("biceps")}/>
          <area shape="poly" coords="100,110,118,110,126,112,122,122,111,136,102,144,95,151,84,160,81,138,85,121" alt="deloite" onClick={() => this.bicepsExerciseCards("deloïde")}/>

          </map>
          <SelectedMuscle muscle = {this.state.selectedMuscle}/>
        </div>
      </div>
    )
  }
}

export default MuscleSchema;
