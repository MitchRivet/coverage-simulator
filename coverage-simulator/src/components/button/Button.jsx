import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";

const Button = props => {
  let className = [styles.round, props.customStyle].join(" ");

  return (
    <button
      className={className}
      onClick={() => {
        props.action();
      }}
    >
      {props.title}
    </button>
  );
};

Button.propTypes = {
  action: PropTypes.func,
  title: PropTypes.string,
  customStyle: PropTypes.string
};

export default Button;
