import React from "react";
import styles from "./MeteoRecord.module.css";
import { IResponseData } from "../../models/Meteo";

export interface IMeteoRecordProps {
  record: IResponseData;
}

const MeteoRecord: React.FC<IMeteoRecordProps> = ({ record }) => {
  const getSlovakLocaleDate = (date: Date) => {
    return new Date(date).toLocaleString("sk-SK");
  };

  const setFormattedText = (txt: string) => {
    const regexp = new RegExp(/(BKN|FEW|SCT)\d{3}/g);
    return txt.replace(regexp, (matched) => {
      const num = Number(matched.substring(3));
      return num <= 30
        ? `<span className="blue-font">$&</span>`
        : `<span className="red-font">$&</span>`;
    });
  };

  return (
    <tr className={styles["table-row"]}>
      <td>{record.queryType}</td>
      <td>{getSlovakLocaleDate(record.reportTime)}</td>
      <td>{setFormattedText(record.text)}</td>
      {/* <td dangerouslySetInnerHTML={{ __html: setFormattedText(record.text) }} /> */}
    </tr>
  );
};

export default MeteoRecord;
