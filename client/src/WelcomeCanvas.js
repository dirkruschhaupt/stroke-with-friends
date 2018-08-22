import React, { Component } from 'react';
import './WelcomeCanvas.css';
import LoginModal from './LoginModal';
import * as d3 from "d3";

import { BrowserRouter as Route} from "react-router-dom"; 

class WelcomeCanvas extends Component {
  constructor(props){
    super(props)
    this.state ={
      props: props,
    }
  }

  componentDidMount() {
    const svgContainer = document.getElementById("svg-container");
    const height = svgContainer.clientHeight;
    const width = svgContainer.clientWidth;

    const canvas = d3.select("#welcome-canvas");
    canvas.style("width", width);
    canvas.style("height", height);

    const rectList = [];

    this.newRectangle = function() {
      const colors = ['violet', 'red', 'blue', 'green', 'orange', 'brown', 'yellow'];
      const rectProps = {
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height),
        height: Math.floor(Math.random() * 100),
        width: Math.floor(Math.random() * 100),
        fill: colors[Math.floor(Math.random() * 7)],
        opacity: 1
      };
      rectList.push(rectProps);
    }

    this.renderRectList = function() {
      canvas.selectAll('*').remove();
      if (rectList.length > 40) {
        rectList.shift();
      }

      let rectangles = canvas.selectAll('rect')
      .data(rectList)
      .enter()
      .append('rect');

      let rectAttrs = rectangles
      .attr("x", function(d) {return d.x})
      .attr("y", function(d) {return d.y})
      .attr("height", function(d) {return d.height})
      .attr("width", function(d) {return d.width})
      .style("fill", function(d) {return d.fill})
      .style("opacity", function(d) {return d.opacity})

    }

    this.fader = function() {
      rectList.forEach(rect => {
        rect.opacity -= 0.05;
      });
    }

    setInterval(this.newRectangle, 100);
    setInterval(this.renderRectList, 100);
    setInterval(this.fader, 100);
  }

  componentWillUnmount() {
    clearInterval(this.newRectangle);
    clearInterval(this.renderRectList);
    clearInterval(this.fader);
  }

  render() {
    return (
      <div id="svg-container" className="row mb-5 view-height d-flex justify-content-center">
        <span className="raise-header text-center position-header p-4 bg-white rounded">
          <h2>Welcome to...</h2>
          <h1>Stroke with Friends</h1>
          <div className="login-btn-container">
            <button type="button" className="btn btn-lg btn-primary" id="login-button" data-toggle="modal" data-target="#modalLRForm">
            Log In
            </button>
          </div>
          <LoginModal />
        </span>
        <svg id="welcome-canvas"></svg>
      </div>
    )
  }
}

export default WelcomeCanvas;