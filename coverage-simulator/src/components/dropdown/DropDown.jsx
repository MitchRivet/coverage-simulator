import React from "react";
import Select from "react-select";

const customStyles = {
  container: styles => ({
    ...styles,
    paddingTop: "6px"
  }),
  control: styles => ({
    ...styles,
    backgroundColor: "transparent",
    borderColor: "#8c8e9b",
    borderRadius: "2px"
  }),
  indicatorSeparator: styles => ({ ...styles, width: "0px" }),
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
