import React from "react";
import spinner from "../../assets/eclipse-spinner.gif";
import styles from "./LoadingSpinner.module.css";
import { Messages } from "../../models/Meteo";

const LoadingSpinner = () => {
  return (
    <div className={styles["spinner-container"]}>
      <img src={spinner} alt={Messages.LOADING_RECORDS} />
    </div>
  );
};

export default LoadingSpinner;
