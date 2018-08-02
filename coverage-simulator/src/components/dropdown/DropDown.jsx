import React from "react";
import Select from "react-select";

const customStyles = {
  control: styles => ({
    ...styles,
    backgroundColor: "transparent"
  }),
  singleValue: styles => ({
    ...styles,
    color: "white"
  }),
  option: (styles, state) => ({
    ...styles,
    color: "black",
    backgroundColor: state.isFocused ? "rgba(68, 137, 244, 0.4)" : "transparent"
  })
};

const DropDown = props => {
  return (
    <Select
      onChange={props.handleChange}
      value={props.selected}
      styles={customStyles}
      defaultValue={props.selected}
      options={props.options}
    />
  );
};
export default DropDown;
