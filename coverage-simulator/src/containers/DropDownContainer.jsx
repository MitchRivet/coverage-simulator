import React, { Component } from "react";
import DropDown from "../components/dropdown/DropDown";

class DropDownContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let options = [
      { value: "4dBm", label: "High (4dBm)" },
      { value: "-6dBm", label: "Med (-6dBm)" },
      { value: "-16dBm", label: "Low (-16dBm)" }
    ];

    return <DropDown options={options} />;
  }
}

export default DropDownContainer;
