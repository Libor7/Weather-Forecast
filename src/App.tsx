import React from "react";
import styles from "./App.module.css";
import MeteoForm from "./components/meteo-form/MeteoForm";
import MeteoOutlook from "./components/meteo-outlook/MeteoOutlook";

function App() {
  return (
    <main className={styles["app-container"]}>
      <MeteoForm />
      <MeteoOutlook />
    </main>
  );
}

export default App;
