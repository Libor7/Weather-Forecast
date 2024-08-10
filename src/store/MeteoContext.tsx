import React, { PropsWithChildren, useState } from "react";
import {
  CodeLengths,
  IMessageTypes,
  IMeteoRequest,
  IResponseData,
  MsgTypes,
} from "../models/Meteo";

export const initialMeteoContext = {
  messageTypes: {
    metar: false,
    sigmet: false,
    taf: false,
  },
  airports: [] as string[],
  countries: [] as string[],
  resultData: [] as IResponseData[],
  HTTPRequestError: null,
  isLoading: false,
  requestSent: false,
  toggleMessageTypes: (msgType: MsgTypes) => {},
  setAirportCodes: (codes: string[]) => {},
  setCountriesCodes: (codes: string[]) => {},
  setAirportsTouched: (val: boolean) => {},
  setCountriesTouched: (val: boolean) => {},
  setTypesTouched: (val: boolean) => {},
  setCodesError: (msg: string | null) => {},
  setTypesError: (msg: string | null) => {},
  setResultData: (data: IResponseData[]) => {},
  setHTTPRequestError: (errorMsg: string | null) => {},
  setIsLoading: (val: boolean) => {},
  setRequestSent: (val: boolean) => {},
  errors: {
    typeErrors: {
      typeErrorMsg: null,
      selectedType: false,
      touchedType: false,
    },
    codeErrors: {
      codeErrorMsg: null,
      emptyAirports: true,
      emptyCountries: true,
      correctAirports: false,
      correctCountries: false,
      touchedAirports: false,
      touchedCountries: false,
    },
  },
};

const MeteoContext = React.createContext<IMeteoRequest>(initialMeteoContext);

export const MeteoContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [resultData, setResultData] = useState<IResponseData[]>([]);
  const [HTTPRequestError, setHTTPRequestError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [requestSent, setRequestSent] = useState<boolean>(false);
  const [messageTypes, setMessageTypes] = useState<IMessageTypes>({
    metar: false,
    sigmet: false,
    taf: false,
  });
  const [airports, setAirports] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [typeErrorMsg, setTypeErrorMsg] = useState<string | null>(null);
  const [touchedType, setTouchedType] = useState<boolean>(false);
  const [codeErrorMsg, setCodeErrorMsg] = useState<string | null>(null);
  const [touchedAirports, setTouchedAirports] = useState<boolean>(false);
  const [touchedCountries, setTouchedCountries] = useState<boolean>(false);

  const messageTypeHandler = (msgType: MsgTypes) => {
    setMessageTypes((previousState: IMessageTypes) => ({
      ...previousState,
      [msgType]: !previousState[msgType],
    }));
  };

  const airportsCodeHandler = (codes: string[]) => {
    setAirports(codes);
  };

  const countriesCodeHandler = (codes: string[]) => {
    setCountries(codes);
  };

  return (
    <MeteoContext.Provider
      value={{
        messageTypes,
        airports,
        countries,
        resultData,
        HTTPRequestError,
        isLoading,
        requestSent,
        toggleMessageTypes: messageTypeHandler,
        setAirportCodes: airportsCodeHandler,
        setCountriesCodes: countriesCodeHandler,
        setAirportsTouched: setTouchedAirports,
        setCountriesTouched: setTouchedCountries,
        setTypesTouched: setTouchedType,
        setCodesError: setCodeErrorMsg,
        setTypesError: setTypeErrorMsg,
        setResultData,
        setHTTPRequestError,
        setIsLoading,
        setRequestSent,
        errors: {
          typeErrors: {
            typeErrorMsg,
            selectedType:
              messageTypes.metar || messageTypes.sigmet || messageTypes.taf,
            touchedType,
          },
          codeErrors: {
            codeErrorMsg,
            emptyAirports: airports.length === 0,
            emptyCountries: countries.length === 0,
            correctAirports: airports.every(
              (code: string) => code.length === CodeLengths.AIRPORT
            ),
            correctCountries:
              countries.every(
                (code: string) => code.length === CodeLengths.COUNTRY
              ),
            touchedAirports,
            touchedCountries,
          },
        },
      }}
    >
      {children}
    </MeteoContext.Provider>
  );
};

export default MeteoContext;
