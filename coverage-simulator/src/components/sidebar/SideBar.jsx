import React, { Component } from "react";
import styles from "./styles.css";
import Button from "../button/Button";
import RadioButtonsContainer from "../../containers/RadioButtonsContainer";
import DropDownContainer from "../../containers/DropDownContainer";

class SideBar extends Component {
  render() {
    return (
      <div className={styles.sideBar}>
        <div className={styles.flexColumn}>
          <div className={styles.sideBarSubTitle}>TX Power</div>
          <DropDownContainer />
        </div>

        <div className={styles.flexColumn}>
          <div className={styles.sideBarSubTitle}>Radio</div>
          <RadioButtonsContainer />
        </div>
        <hr className={styles.lineBreak} />
        <div className={styles.flexRowRightAlign}>
          <Button
            action={this.props.save}
            title={"Save"}
            customStyle={styles.blueButton}
          />
          <Button
            action={this.props.cancel}
            title={"Cancel"}
            customStyle={styles.buttonNoBackground}
          />
        </div>
      </div>
    );
  }
}

export default SideBar;
