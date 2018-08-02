import React, { Component } from "react";
import * as d3 from "d3";
import { PropTypes } from "prop-types";
import styles from "./styles.css";

class CoverageVisualization extends Component {
  constructor(props) {
    super(props);
    this.createCoverageVisual = this.createCoverageVisual.bind(this);
    this.dragstarted = this.dragstarted.bind(this);
    this.dragged = this.dragged.bind(this);
    this.dragended = this.dragended.bind(this);

    this.state = {
      radius: 2,
      unitRadius: 32
    };
  }

  componentDidMount() {
    this.createCoverageVisual();
  }

  createCoverageVisual() {
    const svg = d3.select(this.node),
      width = window.innerWidth - 400,
      height = window.innerHeight - 10,
      drag = d3.drag();

    const circleDatum = {
      x: width / 2,
      y: height / 2
    };

    var points = d3.range(10).map(() => {
      return {
        x: Math.round(
          Math.random() * (width - this.state.radius * 2) + this.state.radius
        ),
        y: Math.round(
          Math.random() * (height - this.state.radius * 2) + this.state.radius
        )
      };
    });

    const circle = svg
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
      .attr("r", this.state.unitRadius)
      .style("fill", "rgba(68, 137, 244, 0.4)")
      .style("cursor", "pointer")
      .call(
        drag
          .on("start", this.dragstarted)
          .on("drag", this.dragged)
          .on("end", this.dragended)
      );

    var points = svg
      .selectAll(null)
      .data(points)
      .enter()
      .append("circle")
      .attr("class", "point")
      .attr("cx", function(d) {
        return d.x;
      })
      .attr("cy", function(d) {
        return d.y;
      })
      .attr("r", this.state.radius)
      .style("fill", p => {
        let x = circleDatum.x - p.x;
        let y = circleDatum.y - p.y;
        let dis = Math.hypot(x, y);
        return dis <= Math.abs(this.state.unitRadius - this.state.radius)
          ? "green"
          : "red";
      });
  }

  dragstarted(d) {
    d3
      .select("#reciever")
      .raise()
      .classed("active", true);
  }

  dragged(d) {
    d3
      .select("#reciever")
      .attr("cx", (d.x = d3.event.x))
      .attr("cy", (d.y = d3.event.y));

    d3.selectAll(".point").style("fill", p => {
      let x = d.x - p.x;
      let y = d.y - p.y;
      let dis = Math.hypot(x, y);
      return dis <= Math.abs(this.state.unitRadius - this.state.radius)
        ? "green"
        : "red";
    });
  }

  dragended(d) {
    d3.select("#reciever").classed("active", false);
  }

  render() {
    let viewBox = "0 0 " + (window.innerWidth - 400) + " " + window.innerHeight;
    return (
      <div className={styles.svgContainer}>
        <svg
          ref={node => (this.node = node)}
          preserveAspectRatio="xMinYMin meet"
          viewBox={viewBox}
          className={styles.svgContent}
        />
      </div>
    );
  }
}

export default CoverageVisualization;
