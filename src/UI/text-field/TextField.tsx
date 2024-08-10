import React, { ChangeEvent, useContext } from "react";
import styles from "./TextField.module.css";
import MeteoContext from "../../store/MeteoContext";

export interface ITextFieldProps {
  blurHandler: () => void;
  codeChangeHandler: (txt: string, callback: (codes: string[]) => void) => void;
  label: string;
  setCodes: (codes: string[]) => void;
}

const TextField: React.FC<ITextFieldProps> = ({
  blurHandler,
  codeChangeHandler,
  label,
  setCodes,
}) => {
  const { errors } = useContext(MeteoContext);
  const { codeErrors } = errors;
  const { codeErrorMsg } = codeErrors;

  return (
    <div className={styles["code-container"]}>
      <label className={`${codeErrorMsg && styles['code-error']}`}>{label}</label>
      <input
        type="text"
        className={`${codeErrorMsg && styles['code-error']}`}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          codeChangeHandler(event.target.value, setCodes)
        }
        onBlur={blurHandler}
      />
    </div>
  );
};

export default TextField;
