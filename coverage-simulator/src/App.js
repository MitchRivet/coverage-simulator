import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CoverageVisualizationContainer from './containers/CoverageVisualizationContainer'
import SideBarContainer from './containers/SideBarContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <CoverageVisualizationContainer />
        <SideBarContainer />
      </div>
    );
  }
}

export default App;
