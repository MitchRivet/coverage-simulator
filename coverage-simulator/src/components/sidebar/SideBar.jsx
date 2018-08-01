import React, { Component } from "react";
import styles from "./styles.css";
import Button from "../button/Button";
import RadioButtons from "../radiobuttons/RadioButtons";

class SideBar extends Component {
  render() {
    return (
      <div className={styles.sideBar}>
        <div className={styles.flexRowLeftAlign}>
          <RadioButtons
            title={"Radio"}
            inputs={[
              { val: "2.4 GHz", unit: "GHz", num: 2.4 },
              { val: "5 GHz", unit: "GHz", num: 5 }
            ]}
          />
        </div>
        <div className={styles.flexRowRightAlign}>
          <Button title={"Save"} customStyle={styles.blueButton} />
          <Button title={"Cancel"} customStyle={styles.blackButton} />
        </div>
      </div>
    );
  }
}

export default SideBar;
