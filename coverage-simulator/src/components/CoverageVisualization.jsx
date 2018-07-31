import React, { Component } from "react";
// import { select, event, behavior } from "d3-selection";
// import { drag } from "d3-drag";
import * as d3 from "d3";
import { PropTypes } from "prop-types";

class CoverageVisualization extends Component {
  constructor(props) {
    super(props);
    this.createCoverageVisual = this.createCoverageVisual.bind(this);
    this.dragstarted = this.dragstarted.bind(this);
    this.dragged = this.dragged.bind(this);
    this.dragended = this.dragended.bind(this);
  }
  componentDidMount() {
    this.createCoverageVisual();
  }
  componentDidUpdate() {
    this.createCoverageVisual();
  }

  createCoverageVisual() {
    var svg = d3.select("svg"),
      width = +svg.attr("width"),
      height = +svg.attr("height"),
      radius = 8,
      unitRadius = 64,
      drag = d3.drag();

    // var recieverDrag = d3.behavior
    //   .drag()
    //   .on("dragstart", this.dragstart)
    //   .on("dragended", this.dragended);

    console.log(drag);
    const circleDatum = {
      x: width / 2,
      y: height / 2
    };

    var circle = svg
      .append("circle")
      .datum(circleDatum)
      .attr("class", "overlay")
      .attr("id", "reciever")
      .attr("cx", function(d) {
        return d.x;
      })
      .attr("cy", function(d) {
        return d.y;
      })
      .attr("r", unitRadius)
      .style("fill", "rgba(68, 137, 244, 0.4)")
      .style("cursor", "pointer")
      .call(
        drag
          .on("start", this.dragstarted)
          .on("drag", this.dragged)
          .on("end", this.dragended)
      );
  }

  dragstarted(d) {
    d3.select("#reciever")
      .raise()
      .classed("active", true);
  }

  dragged(d) {
    d3.select("#reciever")
      .attr("cx", (d.x = d3.event.x))
      .attr("cy", (d.y = d3.event.y));
  }

  dragended(d) {
    d3.select("#reciever").classed("active", false);
  }

  render() {
    return <svg ref={node => (this.node = node)} width={500} height={500} />;
  }
}

export default CoverageVisualization;
