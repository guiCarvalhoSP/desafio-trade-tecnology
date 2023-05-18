import { IResponseApi } from "./response.interface";

export interface IPlayers extends IResponseApi {
  response: [
    {
      name: string;
      age: number,
      nationality: string;
    }
  ]
}