import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Jumbotron, Grid, Row, Col, Image, Button } from 'react-bootstrap';
import '../styles/Home.css';


export default class Home extends Component {
  render() {
  return (
          <Grid>
            <Jumbotron>
              <h2>Welcome to FitPlaner</h2>
              <p>This is how to get muscles and get stronger with fitplaner</p>
              <Link to="/about">
                <Button bsStyle="primary">Learn More</Button>
              </Link>
            </Jumbotron>
          </Grid>
    )
  }
}