import React from "react";
import styles from "./styles.css";

const RadioButtons = props => {
  let options = props.options.map((option, i) => {
    return (
      <label className={styles.centerLabel} key={i}>
        <input
          className={styles.radioSpacing}
          type="radio"
          value={option.value}
          checked={props.selected.value === option.value}
          onChange={() => {
            props.handleChange(option);
          }}
        />
        {option.label}
      </label>
    );
  });

  return <div className={styles.radioButtonColumn}>{options}</div>;
};

export default RadioButtons;
