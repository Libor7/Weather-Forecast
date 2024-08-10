import React, { FormEvent, useCallback, useContext, useEffect } from "react";
import styles from "./MeteoForm.module.css";
import MeteoContext from "../../store/MeteoContext";
import {
  Messages,
  IOpmetResponse,
  Labels,
  Methods,
  MsgTypes,
  Urls,
} from "../../models/Meteo";
import { queryweatherForecast } from "../../services/utils";
import CheckboxField from "../../UI/checkbox-field/CheckboxField";
import TextField from "../../UI/text-field/TextField";

const MeteoForm = () => {
  const {
    airports,
    countries,
    errors,
    setAirportCodes,
    setCountriesCodes,
    setAirportsTouched,
    setCountriesTouched,
    setCodesError,
    setTypesError,
    setResultData,
    setHTTPRequestError,
    setIsLoading,
    setRequestSent,
  } = useContext(MeteoContext);
  const { codeErrors, typeErrors } = errors;
  const { selectedType, touchedType } = typeErrors;
  const {
    correctAirports,
    correctCountries,
    emptyAirports,
    emptyCountries,
    touchedAirports,
    touchedCountries,
  } = codeErrors;

  const submitEnabled =
    selectedType &&
    !(emptyAirports && emptyCountries) &&
    (correctAirports || emptyAirports) &&
    (correctCountries || emptyCountries);

  useEffect(() => {
    !selectedType && touchedType
      ? setTypesError(Messages.NO_TYPE_SELECTED)
      : setTypesError(null);
  }, [selectedType, setTypesError, touchedType]);

  useEffect(() => {
    if (
      emptyAirports &&
      emptyCountries &&
      (touchedAirports || touchedCountries)
    ) {
      setCodesError(Messages.EMPTY_CODES);
    } else if (
      !(emptyAirports && emptyCountries) &&
      (!correctAirports || !correctCountries)
    ) {
      setCodesError(Messages.INCORRECT_CODES);
    } else if (
      (correctAirports && correctCountries) ||
      (correctAirports && emptyCountries) ||
      (correctCountries && emptyAirports)
    ) {
      setCodesError(null);
    }
  }, [
    correctAirports,
    correctCountries,
    emptyAirports,
    emptyCountries,
    setCodesError,
    touchedAirports,
    touchedCountries,
  ]);

  const formSubmitHandler = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsLoading(true);
      setHTTPRequestError(null);

      const reportTypes: string[] = [];
      event.currentTarget
        .querySelectorAll('input[name="message-types"]:checked')
        .forEach((checkbox: Element) =>
          reportTypes.push((checkbox as HTMLInputElement).value)
        );

      const Params = [
        {
          id: new Date().toLocaleString(),
          reportTypes,
          stations: airports,
          countries,
        },
      ];

      const requestData = {
        id: "id" + Date.now(),
        method: Methods.QUERY,
        params: Params,
      };

      queryweatherForecast(Urls.OPMET, requestData)
        .then((resData: IOpmetResponse) => {
          setResultData(resData.result);
          setRequestSent(true);
        })
        .catch((err: Error) => {
          const errorMsg = err.message ?? Messages.HTTP_FAILED_GENERAL;
          setHTTPRequestError(errorMsg);
          setRequestSent(true);
        });

      setIsLoading(false);
    },
    [
      airports,
      countries,
      setHTTPRequestError,
      setIsLoading,
      setRequestSent,
      setResultData,
    ]
  );

  const codeParser = useCallback((txt: string) => {
    const isFieldEmpty = txt.trim().length === 0;
    return isFieldEmpty ? [] : txt.trim().toUpperCase().split(" ");
  }, []);

  const codeChangeHandler = useCallback(
    (txt: string, callback: (codes: string[]) => void) => {
      callback(codeParser(txt));
    },
    [codeParser]
  );

  const airportsBlurHandler = useCallback(() => {
    setAirportsTouched(true);
  }, [setAirportsTouched]);

  const countriesBlurHandler = useCallback(() => {
    setCountriesTouched(true);
  }, [setCountriesTouched]);

  return (
    <section className={styles["form-container"]}>
      <form onSubmit={formSubmitHandler}>
        <div className={styles["message-types-container"]}>
          <label className={styles["message-types-label"]}>
            {Labels.MESSAGE_TYPES}
          </label>
          <div className={styles["message-types"]}>
            <CheckboxField
              inputId="metar-type"
              msgType={MsgTypes.METAR}
              value="METAR"
            />
            <CheckboxField
              inputId="sigmet-type"
              msgType={MsgTypes.SIGMET}
              value="SIGMET"
            />
            <CheckboxField
              inputId="taf-type"
              msgType={MsgTypes.TAF}
              value="TAF"
            />
          </div>
        </div>
        <div className={styles["codes"]}>
          <TextField
            blurHandler={airportsBlurHandler}
            codeChangeHandler={codeChangeHandler}
            label={Labels.AIRPORTS}
            setCodes={setAirportCodes}
          />
          <TextField
            blurHandler={countriesBlurHandler}
            codeChangeHandler={codeChangeHandler}
            label={Labels.COUNTRIES}
            setCodes={setCountriesCodes}
          />
        </div>
        <div className={styles["form-actions"]}>
          <button type="submit" disabled={!submitEnabled}>
            {Labels.CREATE_BRIEFING_BTN}
          </button>
        </div>
      </form>
    </section>
  );
};

export default MeteoForm;
