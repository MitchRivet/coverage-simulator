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
      4 * Math.PI * distance * util.ghzToHz(radioFreqGhz) / util.speedOfLight,
      2
    ),
  freeSpacePathLossDB: (distanceKm, radioFreqGhz) =>
    20 * Math.log10(distanceKm) + 20 * Math.log10(radioFreqGhz) + 92.45,
  accessPointSize: 140,
  accessPointRange: () => util.accessPointSize / 2 + 40
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

    const imageDatum = {
      x: circleDatum.x - util.accessPointSize / 2,
      y: circleDatum.y - util.accessPointSize / 2
    };

    const pointData = d3.range(10).map(() => {
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

    const points = svg
      .selectAll(null)
      .data(pointData)
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
          Math.abs(util.accessPointRange() - this.state.recieverRadius)
          ? "green"
          : "red";
      });

    const accessPointRange = svg
      .append("circle")
      .attr("class", "overlay")
      .attr("id", "accessPointRange")
      .attr("cx", circleDatum.x)
      .attr("cy", circleDatum.y)
      .attr("r", util.accessPointRange())
      .style("fill", "rgba(68, 137, 244, 0.4)");

    const accessPointImage = svg
      .append("svg:image")
      .datum(imageDatum)
      .attr("id", "accessPointImage")
      .attr(
        "xlink:href",
        "https://prd-www-cdn.ubnt.com/media/images/productgroup/unifi-ap-ac-shd/uap-ac-shd-small-2x.png"
      )
      .attr("width", util.accessPointSize)
      .attr("height", util.accessPointSize)
      .style("cursor", "pointer")
      .attr("x", function(d) {
        return d.x;
      })
      .attr("y", function(d) {
        return d.y;
      })
      .call(
        drag
          .on("start", this.dragstarted)
          .on("drag", this.dragged)
          .on("end", this.dragended)
      );

    const legend = svg
      .append("line")
      .attr("x1", this.state.vizWidth - 10)
      .attr("y1", this.state.vizHeight - 50)
      .attr("x2", this.state.vizWidth - 110)
      .attr("y2", this.state.vizHeight - 50)
      .attr("stroke-width", 1)
      .attr("stroke", "grey");

    const legendVertLine1 = svg
      .append("line")
      .attr("x1", this.state.vizWidth - 10)
      .attr("y1", this.state.vizHeight - 50)
      .attr("x2", this.state.vizWidth - 10)
      .attr("y2", this.state.vizHeight - 70)
      .attr("stroke-width", 1)
      .attr("stroke", "grey");

    const legendVertLine2 = svg
      .append("line")
      .attr("x1", this.state.vizWidth - 110)
      .attr("y1", this.state.vizHeight - 50)
      .attr("x2", this.state.vizWidth - 110)
      .attr("y2", this.state.vizHeight - 70)
      .attr("stroke-width", 1)
      .attr("stroke", "grey");

    const legendText = svg
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
      .select("#accessPointImage")
      .raise()
      .classed("active", true);
  }

  dragged(d) {
    d.x = d3.event.x;
    d.y = d3.event.y;

    d3
      .select("#accessPointImage")
      .attr("x", d.x)
      .attr("y", d.y);

    d3
      .select("#accessPointRange")
      .attr("cx", d.x + util.accessPointSize / 2)
      .attr("cy", d.y + util.accessPointSize / 2);

    d3.selectAll(".point").style("fill", p => {
      let cx = d.x + util.accessPointSize / 2;
      let cy = d.y + util.accessPointSize / 2;

      let x = cx - p.x;
      let y = cy - p.y;

      let dis = Math.hypot(x, y);
      let distanceKm = dis / 1000;

      //FREE SPACE PATH LOSS
      //let fsplDb = util.freeSpacePathLossDB(distanceKm, this.props.config.radioFreq.num);

      return dis <=
        Math.abs(util.accessPointRange() - this.state.recieverRadius)
        ? "green"
        : "red";
    });
  }

  dragended(d) {
    d3.select("#accessPointImage").classed("active", false);
  }

  render() {
    let preserveAspectRatio = "xMidYMid meet";
    let viewBox = "0 0 " + this.state.vizWidth + " " + this.state.vizHeight;
    return (
      <div className={styles.svgContainer}>
        <svg
          ref={node => (this.node = node)}
          width={this.state.vizWidth}
          height={this.state.vizHeight}
          preserveAspectRatio={preserveAspectRatio}
          viewBox={viewBox}
          className={styles.svgContent}
        />
      </div>
    );
  }
}

export default CoverageVisualization;
