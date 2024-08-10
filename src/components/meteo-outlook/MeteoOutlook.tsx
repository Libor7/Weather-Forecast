import React, { useContext } from "react";
import styles from "./MeteoOutlook.module.css";
import MeteoContext from "../../store/MeteoContext";
import LoadingSpinner from "../../UI/loading-spinner/LoadingSpinner";
import MeteoTable from "../meteo-table/MeteoTable";
import { Messages } from "../../models/Meteo";

const MeteoOutlook = () => {
  const { resultData, HTTPRequestError, isLoading, requestSent } =
    useContext(MeteoContext);

  let content = null;

  if (requestSent && resultData.length === 0) {
    content = (
      <p className={styles["no-results-found"]}>
        {Messages.NO_RESULTS_FOUND.toUpperCase()}
      </p>
    );
  }

  if (resultData.length > 0) {
    content = <MeteoTable resultData={resultData} />;
  }

  if (isLoading) {
    content = <LoadingSpinner />;
  }

  if (HTTPRequestError) {
    content = (
      <p className={styles["request-error"]}>
        {HTTPRequestError.toUpperCase()}
      </p>
    );
  }

  return <section className={styles["outlook-container"]}>{content}</section>;
};

export default MeteoOutlook;
