import React from "react";
import styles from "./MeteoTable.module.css";
import { IResponseData } from "../../models/Meteo";
import MeteoStation from "../meteo-station/MeteoStation";

export interface IMeteoTableProps {
  resultData: IResponseData[];
}

export interface IRecords {
  station: string;
  records: IResponseData[] | undefined;
}

const MeteoTable: React.FC<IMeteoTableProps> = ({ resultData }) => {
  const sortRecordsById = (records: IResponseData[]) => {
    return records.sort((recA, recB) =>
      recA.stationId.localeCompare(recB.stationId)
    );
  };

  const groupRecordsById = (records: IResponseData[]) => {
    return Object.groupBy(records, ({ stationId }: IResponseData) => stationId);
  };

  const mapRecords = () => {
    const groupedRecords = groupRecordsById(sortRecordsById(resultData));
    const mappedRecords: IRecords[] = [];

    for (let key in groupedRecords) {
      mappedRecords.push({
        station: key,
        records: groupedRecords[key],
      });
    }
    return mappedRecords;
  };

  return (
    <table className={styles["table-container"]}>
      <tbody>
        {mapRecords().map(({ station, records }: IRecords, index) => (
          <MeteoStation
            key={station + index}
            records={records}
            stationId={station}
          />
        ))}
      </tbody>
    </table>
  );
};

export default MeteoTable;
