import { TestBed } from '@angular/core/testing';

import { FootballService } from './football.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { LocalStorageService } from './local-storage.service';
import { IMessageApi } from '../interfaces/response.interface';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ILeague, ILeagues } from '../interfaces/leagues.interface';

describe('FootballService', () => {
  let httpTestingController: HttpTestingController;
  let url = environment.apiUrl;
  let service: FootballService;
  let headers: HttpHeaders;
  const responseObject: IMessageApi = { message: 'Testes unititários' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: LocalStorageService,
          useValue: {
            obterValor: jasmine.createSpy('obterValor').and.returnValue('key'),
          },
        },
      ],
    });
    headers = new HttpHeaders()
      .set('x-rapidapi-host', 'v3.football.api-sports.io')
      .set('x-rapidapi-key', 'key');

    service = TestBed.inject(FootballService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Deve fazer requisição http get ao listar paises', () => {
    service.listarPaises().subscribe((res) => {
      expect(res).toBe(responseObject);
    });

    const request = httpTestingController.expectOne(`${url}/countries`);
    request.flush(responseObject);

    expect(request.request.method).toBe('GET');
    expect(request.request.headers).toEqual(headers);
    expect(request.request.url).toBe(`${url}/countries`);
  });

  it('Deve fazer requisição http get ao listar ligas', () => {
    service.listarLigas('pais').subscribe((res) => {
      expect(res).toBe(responseObject);
    });

    const request = httpTestingController.expectOne(
      `${url}/leagues?country=pais`
    );
    request.flush(responseObject);

    expect(request.request.method).toBe('GET');
    expect(request.request.headers).toEqual(headers);
    expect(request.request.url).toBe(`${url}/leagues?country=pais`);
  });

  it('Deve fazer requisição http get ao listar times da liga, sem passar a temporada', () => {
    service.listarTimesDaLiga('id').subscribe((res) => {
      expect(res).toBe(responseObject);
    });

    const request = httpTestingController.expectOne(`${url}/teams?league=id`);
    request.flush(responseObject);

    expect(request.request.method).toBe('GET');
    expect(request.request.headers).toEqual(headers);
    expect(request.request.url).toBe(`${url}/teams?league=id`);
  });

  it('Deve fazer requisição http get ao listar times da liga, passando a temporada', () => {
    service.listarTimesDaLiga('id', 2023).subscribe((res) => {
      expect(res).toBe(responseObject);
    });

    const request = httpTestingController.expectOne(
      `${url}/teams?league=id&season=2023`
    );
    request.flush(responseObject);

    expect(request.request.method).toBe('GET');
    expect(request.request.headers).toEqual(headers);
    expect(request.request.url).toBe(`${url}/teams?league=id&season=2023`);
  });

  it('Deve fazer requisição http get ao listar estatisticas do time', () => {
    service.listarEstatiticasDoTime('id', 2023, '1').subscribe((res) => {
      expect(res).toBe(responseObject);
    });

    const request = httpTestingController.expectOne(
      `${url}/teams/statistics?league=id&season=2023&team=1`
    );
    request.flush(responseObject);

    expect(request.request.method).toBe('GET');
    expect(request.request.headers).toEqual(headers);
    expect(request.request.url).toBe(
      `${url}/teams/statistics?league=id&season=2023&team=1`
    );
  });

  it('Deve fazer requisição http get ao listar jogadores de um time', () => {
    service.listarJogadoresDoTime('1', 'id', 2023).subscribe((res) => {
      expect(res).toBe(responseObject);
    });

    const request = httpTestingController.expectOne(
      `${url}/players?team=1&season=2023&league=id`
    );
    request.flush(responseObject);

    expect(request.request.method).toBe('GET');
    expect(request.request.headers).toEqual(headers);
    expect(request.request.url).toBe(
      `${url}/players?team=1&season=2023&league=id`
    );
  });

  it('Deve listar as temporadas disponiveis de uma liga', () => {
    let ligas: ILeagues = {
      response: [
        {
          league: {
            id: 'id',
            name: 'string',
            type: 'string',
            logo: 'string',
          },
          seasons: [
            {
              year: 2023,
              start: 'string',
              end: 'string',
              current: true,
              coverage: {
                fixtures: {
                  events: true,
                  lineups: true,
                  statistics_fixtures: true,
                  statistics_players: true,
                },
                standings: true,
                players: true,
                top_scorers: true,
                top_assists: true,
                top_cards: true,
                injuries: true,
                predictions: true,
                odds: true,
              },
            },
            {
              year: 2022,
              start: 'string',
              end: 'string',
              current: false,
              coverage: {
                fixtures: {
                  events: true,
                  lineups: true,
                  statistics_fixtures: true,
                  statistics_players: true,
                },
                standings: true,
                players: true,
                top_scorers: true,
                top_assists: true,
                top_cards: true,
                injuries: true,
                predictions: true,
                odds: true,
              },
            },
          ],
        },
      ],
      get: '',
      parameters: undefined,
      errors: undefined,
      results: 0,
      paging: {
        current: undefined,
        total: undefined,
      },
    };

    let response: string[] = service.listarTemporadas(ligas, 'id');

    expect(response).toContain('2022');
    expect(response).toContain('2023');

  });

  it('Deve retornar uma lista vazia, se o id da liga não for pertencente a nenhuma das ligas passadas', () => {
    let ligas: ILeagues = {
      response: [
        {
          league: {
            id: 'id',
            name: 'string',
            type: 'string',
            logo: 'string',
          },
          seasons: [
            {
              year: 2023,
              start: 'string',
              end: 'string',
              current: true,
              coverage: {
                fixtures: {
                  events: true,
                  lineups: true,
                  statistics_fixtures: true,
                  statistics_players: true,
                },
                standings: true,
                players: true,
                top_scorers: true,
                top_assists: true,
                top_cards: true,
                injuries: true,
                predictions: true,
                odds: true,
              },
            },
            {
              year: 2022,
              start: 'string',
              end: 'string',
              current: false,
              coverage: {
                fixtures: {
                  events: true,
                  lineups: true,
                  statistics_fixtures: true,
                  statistics_players: true,
                },
                standings: true,
                players: true,
                top_scorers: true,
                top_assists: true,
                top_cards: true,
                injuries: true,
                predictions: true,
                odds: true,
              },
            },
          ],
        },
      ],
      get: '',
      parameters: undefined,
      errors: undefined,
      results: 0,
      paging: {
        current: undefined,
        total: undefined,
      },
    };

    let response: string[] = service.listarTemporadas(ligas, 'id2');

    expect(response).toEqual([]);


  });
});
