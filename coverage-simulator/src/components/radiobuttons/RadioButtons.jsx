import React, { Component } from "react";
import styles from "./styles.css";

class RadioButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      selection: e.target.value
    });
    //dispatch redux change radioUpdate
  }

  render() {
    let inputs = this.props.inputs.map(input => {
      return (
        <label className={styles.centerLabel}>
          <input
            className={styles.radioSpacing}
            type="radio"
            value={input.val}
            checked={this.state.selection === input.val}
            onChange={this.handleChange}
          />
          {input.val}
        </label>
      );
    });
    return (
      <div className={styles.radioButtonColumn}>
        {inputs}
      </div>
    );
  }
}

export default RadioButtons;
