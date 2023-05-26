import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { ICountry } from '../interfaces/country.interface';
import { ILeagues } from '../interfaces/leagues.interface';
import { IPlayers } from '../interfaces/player.interface';
import { IMessageApi } from '../interfaces/response.interface';
import { ITeams, ITeamStatics } from '../interfaces/team.interfaces';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class FootballService {
  readonly url: string = environment.apiUrl;
  readonly key: string | null;
  readonly headers: any;
  readonly parametroKey: string =  environment.key;

  constructor(private http: HttpClient, private storageService: LocalStorageService) { 
    this.key  = this.storageService.obterValor(this.parametroKey);
    if(this.key) {
      this.headers  = new HttpHeaders()
      .set('x-rapidapi-host', 'v3.football.api-sports.io')
      .set('x-rapidapi-key', this.key);
    }
  }

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

  listarJogadoresDoTime(timeId: string | number, ligaId: string | number, temporada: number) {
    return this.http.get<IPlayers | IMessageApi>(
      `${this.url}/players?team=${timeId}&season=${temporada}&league=${ligaId}`, { headers: this.headers }
    );
  }

  listarTemporadas(ligas: ILeagues, ligaId: string): string[] {
    let temporadas = ligas.response
      .find((liga) => liga.league.id == ligaId)
      ?.seasons.map((season) => season.year.toString());

    if (temporadas) {
      return temporadas;
    }

    return []
  }
}
