import React, { Component } from "react";
import { connect } from "react-redux";
import RadioButtons from "../components/radiobuttons/RadioButtons";
import { editConfigUpdate } from "../actions/actionCreators";

class RadioButtonsContainer extends Component {
  constructor(props) {
    super(props);
    this.changeRadioFreq = this.changeRadioFreq.bind(this);
  }

  changeRadioFreq(newFreq) {
    let updateEditConfig = Object.assign(
      {},
      { ...this.props.editConfig },
      { radioFreq: newFreq }
    );
    this.props.editConfigUpdate(updateEditConfig);
  }

  render() {
    return (
      <RadioButtons
        options={this.props.radioFreqOptions}
        selected={this.props.editConfig.radioFreq}
        handleChange={this.changeRadioFreq}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    editConfig: state.editConfig,
    radioFreqOptions: state.radioFreqOptions
  };
};

const mapDispatchToProps = {
  editConfigUpdate
};

export default connect(mapStateToProps, mapDispatchToProps)(
  RadioButtonsContainer
);
