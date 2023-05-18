import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { ICountry } from '../interfaces/country.interface';
import { ILeagues } from '../interfaces/leagues.interface';
import { IMessageApi, IResponseApi } from '../interfaces/response.interface';
import { ITeams, ITeamStatics } from '../interfaces/team.interfaces';
import { IPlayers } from '../interfaces/player.interface';

@Injectable({
  providedIn: 'root',
})
export class FootballService {
  readonly url: string = environment.apiUrl;
  // Will be change after te creation of authentication
  readonly key: string = environment.key;
  readonly headers = new HttpHeaders()
    .set('x-rapidapi-host', 'v3.football.api-sports.io')
    .set('x-rapidapi-key', this.key);

  constructor(private http: HttpClient) { }

  listarPaises() {
    return this.http.get<ICountry | IMessageApi>(`${this.url}/countries`, { headers: this.headers,});
  }

  listarLigas(pais: string) {
    return this.http.get<ILeagues | IMessageApi>(
      `${this.url}/leagues?country=${pais}`, { headers: this.headers }
    );
  }

  listarTimesDaLiga(ligaId: string, temporada?: number) {
    if (temporada) {
      return this.http.get<ITeams | IMessageApi>(
        `${this.url}/teams?league=${ligaId}&season=${temporada}`, { headers: this.headers }
      );
    }
    return this.http.get<ITeams | IMessageApi>(
      `${this.url}/teams?league=${ligaId}`, { headers: this.headers }
    );
  }

  listarEstatiticasDoTime(ligaId: string, temporada: number, timeId: string) {
    return this.http.get<ITeamStatics | IMessageApi>(
      `${this.url}/teams/statistics?league=${ligaId}&season=${temporada}&team=${timeId}`, { headers: this.headers }
    );
  }

  listarJogadoresDoTime(timeId: string, temporada: number) {
    return this.http.get<IPlayers | IMessageApi>(
      `${this.url}/players?team=${timeId}&season=${temporada}`, { headers: this.headers }
    );

  }
}
