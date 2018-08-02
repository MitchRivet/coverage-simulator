import React, { Component } from "react";
import { connect } from "react-redux";
import SideBar from "../components/sidebar/SideBar";
import { editConfigSave, editConfigClear } from "../actions/actionCreators";

class SideBarContainer extends Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleSave() {
    this.props.editConfigSave(this.props.editConfig);
  }

  handleCancel() {
    this.props.editConfigClear(this.props.currentConfig);
  }

  render() {
    return <SideBar cancel={this.handleCancel} save={this.handleSave} />;
  }
}

const mapDispatchToProps = {
  editConfigSave,
  editConfigClear
};

const mapStateToProps = state => {
  return {
    editConfig: state.editConfig,
    currentConfig: state.currentConfig
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBarContainer);
