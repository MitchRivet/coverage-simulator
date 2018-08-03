import React from "react";
import styles from "./styles.css";

const RadioButtons = props => {
  let options = props.options.map((option, i) => {
    return (
      <li className={styles.itemLayout} key={i}>
        <input
          className={styles.radioInput}
          type="radio"
          value={option.value}
          onChange={() => {}}
          checked={props.selected.value === option.value}
        />
        <div
          className={styles.check}
          onClick={() => {
            props.handleChange(option);
          }}
        >
          <div />
        </div>
        <label className={styles.centerLabel}>{option.label}</label>
      </li>
    );
  });

  return (
    <div className={styles.radioButtonColumn}>
      <ul className={styles.listSpace}>{options}</ul>
    </div>
  );
};

export default RadioButtons;
