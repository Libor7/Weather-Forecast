import React, { Fragment } from "react";
import styles from "./MeteoStation.module.css";
import { IResponseData } from "../../models/Meteo";
import MeteoRecord from "../meteo-record/MeteoRecord";

export interface IMeteoStationProps {
  stationId: string;
  records: IResponseData[] | undefined;
}

const MeteoStation: React.FC<IMeteoStationProps> = ({
  records,
  stationId,
}) => {
  return (
    <Fragment>
      <tr className={styles['table-header-row']}>
        <th colSpan={3}>{stationId}</th>
      </tr>
      {records!.map(
        (record: IResponseData, i) => (
          <MeteoRecord record={record} key={record.stationId + i} />
        )
      )}
    </Fragment>
  );
};

export default MeteoStation;
