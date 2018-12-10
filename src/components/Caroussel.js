import React, { Component } from 'react'
import '../styles/Caroussel.css'
import Item from './Item'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Caroussel extends Component {
    constructor(props) {
        super(props)
    }
    render(){

      var exerciseList =this.props.exerciseList
      return(

        <div>
          <div>
            <ul>
                {exerciseList.map(exercise => <li>{exercise}</li>)}
            </ul>
          </div>
          <div class="carousel" data-flickity='{ "fullscreen": true, "lazyLoad": 1 }'>
            <div class="carousel-cell">
              <img class="carousel-cell-image"
              data-flickity-lazyload="https://i.imgur.com/iyluOns.gif" />
            </div>
            <div class="carousel-cell">
              <img class="carousel-cell-image"
              data-flickity-lazyload="https://i.imgur.com/wZudlzi.gif" />
            </div>
            <div class="carousel-cell">
              <img class="carousel-cell-image"
              data-flickity-lazyload="https://i.imgur.com/tRLEks1.gif" />
            </div>
            <div class="carousel-cell">
              <img class="carousel-cell-image"
              data-flickity-lazyload="https://i.imgur.com/dFb6PLa.gif" />
            </div>
          </div>
        </div>

      )
    }
}
