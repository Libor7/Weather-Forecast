export enum CodeLengths {
  AIRPORT = 4,
  COUNTRY = 2,
}

export enum Labels {
  CREATE_BRIEFING_BTN = "Create Briefing",
  MESSAGE_TYPES = "Message Types",
  AIRPORTS = "Airports",
  COUNTRIES = "Countries",
}

export enum Messages {
  NO_TYPE_SELECTED = "Please select at least one message type",
  EMPTY_CODES = "Please select at least one airport or country code",
  INCORRECT_CODES = "One or more codes might be incorrect, please check the code length",
  HTTP_FAILED_GENERAL = "The HTTP request wasn't successful",
  NO_RESULTS_FOUND = "No results were found for the specified criteria. Please change the form input, or try later.",
  HTTP_FAILED_REQ = "Weather forecast request wasn't successful",
  LOADING_RECORDS = "...Loading records, please wait",
}

export enum Methods {
  QUERY = "query",
}

export enum MsgTypes {
  METAR = "metar",
  SIGMET = "sigmet",
  TAF = "taf",
}

export enum Urls {
  OPMET = "https://ogcie.iblsoft.com/ria/opmetquery",
}

export interface ICodeErrors {
  codeErrorMsg: string | null;
  emptyAirports: boolean;
  emptyCountries: boolean;
  correctAirports: boolean;
  correctCountries: boolean;
  touchedAirports: boolean;
  touchedCountries: boolean;
}

export interface IErrors {
  typeErrors: ITypeErrors;
  codeErrors: ICodeErrors;
}

export interface IMessageTypes {
  metar: boolean;
  sigmet: boolean;
  taf: boolean;
}

export interface IMeteoRequest {
  messageTypes: IMessageTypes;
  airports: string[];
  countries: string[];
  resultData: IResponseData[];
  HTTPRequestError: string | null;
  isLoading: boolean;
  requestSent: boolean;
  toggleMessageTypes: (msgType: MsgTypes) => void;
  setAirportCodes: (codes: string[]) => void;
  setCountriesCodes: (codes: string[]) => void;
  setAirportsTouched: (val: boolean) => void;
  setCountriesTouched: (val: boolean) => void;
  setTypesTouched: (val: boolean) => void;
  setCodesError: (msg: string | null) => void;
  setTypesError: (msg: string | null) => void;
  setResultData: (data: IResponseData[]) => void;
  setHTTPRequestError: (errorMsg: string | null) => void;
  setIsLoading: (val: boolean) => void;
  setRequestSent: (val: boolean) => void;
  errors: IErrors;
}

export interface IPlaces {
  icao: string;
  fir: string;
  country: string;
}

export interface IRequestData {
  id: string;
  method: string;
  params: IRequestParams[];
}

export interface IRequestParams {
  id?: string;
  colorize?: boolean;
  reportTypes: string[];
  places?: IPlaces[];
  stations?: string[];
  firs?: string[];
  countries?: string[];
  timeMode?: TimeMode;
  timeReference?: Date;
  timeRangeStart?: Date;
  timeRangeEnd?: Date;
  aggregationStyle?: string;
}

export interface IOpmetResponse {
  error: string | null;
  id: string;
  result: IResponseData[];
}

export interface IResponseData {
  refs?: string[];
  queryType: string;
  reportType: string;
  stationId: string;
  revision?: Revision;
  placeId?: string;
  text: string;
  textHTML?: string;
  receptionTime?: Date;
  reportTime: Date;
  validFrom?: Date;
  validEnd?: Date;
}

export interface ITypeErrors {
  typeErrorMsg: string | null;
  selectedType: boolean;
  touchedType: boolean;
}

export type  Revision = "COR" | "AMD";

export type TimeMode =
  | "current"
  | "valid"
  | "reception-time"
  | "validity-or-issue-time"
  | "range-reception-time"
  | "range-validity-or-issue-time"
  | "range-reception-time-relevant-validity"
  | "range-validity-or-issue-time-relevant-validity"
  | "range-validity-intersects";
