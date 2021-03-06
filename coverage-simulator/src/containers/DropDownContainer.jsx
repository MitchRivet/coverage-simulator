import React, { Component } from "react";
import { connect } from "react-redux";
import DropDown from "../components/dropdown/DropDown";
import { editConfigUpdate } from "../actions/actionCreators";

class DropDownContainer extends Component {
  constructor(props) {
    super(props);
    this.changeTxPower = this.changeTxPower.bind(this);
  }

  changeTxPower(newValue, action) {
    let updateEditConfig = Object.assign(
      {},
      { ...this.props.editConfig },
      { txPower: newValue }
    );
    this.props.editConfigUpdate(updateEditConfig);
  }

  render() {
    return (
      <DropDown
        options={this.props.txPowerOptions}
        selected={this.props.editConfig.txPower}
        handleChange={this.changeTxPower}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    editConfig: state.editConfig,
    txPowerOptions: state.txPowerOptions
  };
};

const mapDispatchToProps = {
  editConfigUpdate
};

export default connect(mapStateToProps, mapDispatchToProps)(DropDownContainer);
