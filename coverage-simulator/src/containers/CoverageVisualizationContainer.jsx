import React, { Component } from "react";
import { connect } from "react-redux";
import CoverageVisualization from "../components/coverage-visualization/CoverageVisualization";

class CoverageVisualizationContainer extends Component {
  render() {
    return <CoverageVisualization config={this.props.currentConfig} />;
  }
}

const mapStateToProps = state => {
  return {
    currentConfig: state.currentConfig
  };
};

export default connect(mapStateToProps)(CoverageVisualizationContainer);
