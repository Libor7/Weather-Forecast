import React, { useContext } from "react";
import styles from "./CheckboxField.module.css";
import MeteoContext from "../../store/MeteoContext";
import { MsgTypes } from "../../models/Meteo";

export interface ICheckboxFieldProps {
  inputId: string;
  msgType: MsgTypes;
  value: string;
}

const CheckboxField: React.FC<ICheckboxFieldProps> = ({
  inputId,
  msgType,
  value,
}) => {
  const { errors, setTypesTouched, toggleMessageTypes } =
    useContext(MeteoContext);
  const { typeErrors } = errors;
  const { typeErrorMsg } = typeErrors;

  return (
    <div className={styles["message-type"]}>
      <input
        type="checkbox"
        className={`${typeErrorMsg && styles["type-error"]}`}
        id={inputId}
        onChange={() => {
          toggleMessageTypes(msgType);
          setTypesTouched(true);
        }}
        name="message-types"
        value={value}
      />
      <label
        htmlFor={inputId}
        className={`${typeErrorMsg && styles["type-error"]}`}
      >
        {" " + value}
      </label>
    </div>
  );
};

export default CheckboxField;
