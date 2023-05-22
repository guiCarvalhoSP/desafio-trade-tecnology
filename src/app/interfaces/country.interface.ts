import { IResponseApi } from "./response.interface";

export interface ICountry extends IResponseApi {
  response: [
    {
      name: string;
      code: string;
      flag: string;
    }
  ];
}
