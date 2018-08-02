import React, { Component } from "react";
import layout from "./styles/layout.css";
import CoverageVisualizationContainer from "./containers/CoverageVisualizationContainer";
import SideBarContainer from "./containers/SideBarContainer";

class App extends Component {
  render() {
    return (
      <div className={layout.row}>
        <CoverageVisualizationContainer />
        <SideBarContainer />
      </div>
    );
  }
}

export default App;
