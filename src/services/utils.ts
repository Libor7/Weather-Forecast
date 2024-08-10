import { IOpmetResponse, IRequestData, Messages, Urls } from "../models/Meteo";

export const queryweatherForecast = async (url: Urls, reqData: IRequestData): Promise<IOpmetResponse> => {
  const response = await fetch(
    url,
    {
      method: "POST",
      body: JSON.stringify(reqData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(Messages.HTTP_FAILED_REQ);
  }
  
  return await response.json();
};
