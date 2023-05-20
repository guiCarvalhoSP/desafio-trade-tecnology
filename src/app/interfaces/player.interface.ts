import { IResponseApi } from "./response.interface";

export interface IPlayers extends IResponseApi {
  response: {
    player: IPlayer
  }[]
}

interface IPlayer {
  
  name: string;
  firstname: string;
  age: number,
  nationality: string;
}