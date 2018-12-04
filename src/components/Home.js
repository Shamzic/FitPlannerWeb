import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Jumbotron, Grid, Button } from 'react-bootstrap';
import MuscleSchema from './MuscleSchema'
import '../styles/Home.css';
import { FacebookShareButton } from "react-simple-share";


export default class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      close: false
    }
  }

  welcomeClose() {
    this.setState({close: true})
  }

  render() {

    let WelcomePack;
    var close = this.state.close;
    if(close == false) {
      WelcomePack =
      <Jumbotron>
        <h2>Welcome to FitPlanner</h2>
        <p>This is how to get muscles and get stronger with fitplanner</p>
        <Link to="/about">
          <Button bsStyle="primary">Learn More about our team</Button><br/><br/>
        </Link>
        <Button bsStyle="danger" onClick={() => this.welcomeClose()}>Close this tab</Button>
      </Jumbotron>
    }
  return (
        <div className="container">
          <Grid>
            {WelcomePack}
          </Grid>
          <div className="muscleSchema">
            <MuscleSchema/>
          </div>
          
          <FacebookShareButton
            url="https://github.com/Shamzic/"
            color="#3B5998"
            size="40px"
          />
        </div>
    )
  }
}
