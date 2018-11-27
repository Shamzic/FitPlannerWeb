import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Jumbotron, Grid, Row, Col, Image} from 'react-bootstrap';
import '../styles/About.css'

class Header extends Component {
  render() {

    return (

      <Grid>
        <Jumbotron>
          <h2>Who we are ?</h2>
          <p>Presentation of our team</p>
        </Jumbotron>
        <Row className="show-grid text-center">
          <Col xs={12} sm={4} className="person-wrapper">
            <Image id="img" src="/img/garry.jpg" circle className="profil-pic" />
            <h3>Garry</h3>
            <p> Developper </p>
          </Col>
          <Col xs={12} sm={4} className="pwerson-wra pper">
            <Image id="img" src="/img/simon.jpg" circle className="profil-pic" />
            <h3>Simon</h3>
            <p> Developper </p>
          </Col>
          <Col xs={12} sm={4} className="pwerson-wrapper">
            <Image id="img"   src="./img/rachel.jpg" circle className="profil-pic" />
            <h3>Rachel</h3>
            <p> Developper </p>
          </Col>
        </Row>

      </Grid>
    )
  }
}

export default withRouter(Header)
