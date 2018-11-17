import React, { Component } from 'react'
import '../styles/MuscleSchema.css'
import body from '../assets/body.png';

class MuscleSchema extends Component {

  /* I founded exact coordonates with this tool : http://imagemap-generator.dariodomi.de/*/
  bicepsExerciseCards() {
    alert('You clicked on the biceps !');
  }

  render() {
    return (
      <div className="container">
        <div className="text-center">
          <img src={body} alt="responsive" className="img-fluid mx-auto d-block" usemap="#musclemap"/>
          <map name="musclemap">
            <area shape="poly" coords="231,140,260,161,262,183,257,203,257,215,242,214,224,177,225,165,230,149" alt="biceps" onClick={this.bicepsExerciseCards}/>
            <area shape="poly" coords="111,140,81,161,81,192,90,214,100,216,115,188,120,168"  alt="biceps" onClick={this.bicepsExerciseCards}/>
          </map>
        </div>
      </div>
    )
  }
}

export default MuscleSchema;
