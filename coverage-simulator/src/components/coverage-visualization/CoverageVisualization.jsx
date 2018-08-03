import React, { Component } from "react";
import * as d3 from "d3";
import { PropTypes } from "prop-types";
import styles from "./styles.css";

// Speed of Light in m/sec
const sol = 299792458;

const util = {
  speedOfLight: 299792458, // m/sec
  ghzToHz: ghz => ghz * Math.pow(10, 9),
  freeSpacePathLoss: (distance, radioFreqGhz) =>
    Math.pow(
      4 *
        Math.PI *
        distance *
        util.ghzToHz(radioFreqGhz) /
        util.speedOfLight,
      2
    )
};

class CoverageVisualization extends Component {
  constructor(props) {
    super(props);
    this.createCoverageVisual = this.createCoverageVisual.bind(this);
    this.dragstarted = this.dragstarted.bind(this);
    this.dragged = this.dragged.bind(this);
    this.dragended = this.dragended.bind(this);

    this.state = {
      recieverRadius: 6,
      accessPointRadius: 80,
      vizWidth: window.innerWidth - 350,
      vizHeight: window.innerHeight
    };
  }

  componentDidMount() {
    this.createCoverageVisual();
  }

  createCoverageVisual() {
    const svg = d3.select(this.node),
      drag = d3.drag();

    const circleDatum = {
      x: this.state.vizWidth / 2,
      y: this.state.vizHeight / 2
    };

    var points = d3.range(10).map(() => {
      return {
        x: Math.round(
          Math.random() *
            (this.state.vizWidth - this.state.recieverRadius * 2) +
            this.state.recieverRadius
        ),
        y: Math.round(
          Math.random() *
            (this.state.vizHeight - this.state.recieverRadius * 2) +
            this.state.recieverRadius
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
      .attr("r", this.state.accessPointRadius)
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
      .attr("r", this.state.recieverRadius)
      .style("fill", p => {
        let x = circleDatum.x - p.x;
        let y = circleDatum.y - p.y;
        let dis = Math.hypot(x, y);
        return dis <=
          Math.abs(this.state.accessPointRadius - this.state.recieverRadius)
          ? "green"
          : "red";
      });

    var legend = svg
      .append("line")
      .attr("x1", this.state.vizWidth - 10)
      .attr("y1", this.state.vizHeight - 50)
      .attr("x2", this.state.vizWidth - 110)
      .attr("y2", this.state.vizHeight - 50)
      .attr("stroke-width", 1)
      .attr("stroke", "grey");

    var legendVertLine1 = svg
      .append("line")
      .attr("x1", this.state.vizWidth - 10)
      .attr("y1", this.state.vizHeight - 50)
      .attr("x2", this.state.vizWidth - 10)
      .attr("y2", this.state.vizHeight - 70)
      .attr("stroke-width", 1)
      .attr("stroke", "grey");

    var legendVertLine2 = svg
      .append("line")
      .attr("x1", this.state.vizWidth - 110)
      .attr("y1", this.state.vizHeight - 50)
      .attr("x2", this.state.vizWidth - 110)
      .attr("y2", this.state.vizHeight - 70)
      .attr("stroke-width", 1)
      .attr("stroke", "grey");

    var legendText = svg
      .append("text")
      .attr("x", this.state.vizWidth - 85)
      .attr("y", this.state.vizHeight - 60)
      .text(function(d) {
        return "100m";
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", "20px");
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
      
      return dis <=
        Math.abs(this.state.accessPointRadius - this.state.recieverRadius)
        ? "green"
        : "red";
    });
  }

  dragended(d) {
    d3.select("#reciever").classed("active", false);
  }

  render() {
    let preserveAspectRatio = "xMidYMid meet";
    let viewBox = "0 0 " + this.state.vizWidth + " " + this.state.vizHeight;
    return (
      <div className={styles.svgContainer}>
        <svg
          ref={node => (this.node = node)}
          preserveAspectRatio={preserveAspectRatio}
          viewBox={viewBox}
          className={styles.svgContent}
        />
      </div>
    );
  }
}

export default CoverageVisualization;
