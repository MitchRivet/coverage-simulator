import React, { Component } from "react";
import CoverageVisualization from "../components/CoverageVisualization";
import { PropTypes } from "prop-types";

class CoverageVisualizationContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <CoverageVisualization />;
  }
}

export default CoverageVisualizationContainer;
