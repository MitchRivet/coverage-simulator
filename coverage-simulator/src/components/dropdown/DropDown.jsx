import React, { Component } from "react";
import Select from "react-select";

const DropDown = (props) => {
    return (
        <Select 
            options={props.options}
        />
    )
}
export default DropDown;
