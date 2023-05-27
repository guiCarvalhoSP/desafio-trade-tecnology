import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { Observable } from 'rxjs';
import { IPlayers } from 'src/app/interfaces/player.interface';
import { FootballService } from 'src/app/services/football.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ITeamStatics } from 'src/app/interfaces/team.interfaces';
import { NgChartsModule } from 'ng2-charts';
import { LoadingComponent } from '../loading/loading.component';
import { GraficoComponent } from '../grafico/grafico.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  let mockListaJogadores: IPlayers = {
    response: [
      {
        player: {
          name: 'name',
          firstname: 'firstname',
          age: 20,
          nationality: 'nationality',
        },
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

  let mockFootballSerivce = {
    listarJogadoresDoTime: jasmine
      .createSpy('listarJogadoresDoTime')
      .and.returnValue(
        new Observable<IPlayers>((subscriber) => {
          subscriber.next(mockListaJogadores);
        })
      ),
  };

  let mockEstatisticas: ITeamStatics = {
    response: {
      league: {
        id: 2,
        name: 'string',
        country: 'string',
        logo: 'string',
        flag: 'string',
        season: 2,
      },

      team: {
        id: 2,
        name: 'string',
        logo: 'string',
      },

      form: 'string',

      fixtures: {
        played: {
          home: 1,
          away: 1,
          total: 1,
        },
        wins: {
          home: 1,
          away: 1,
          total: 1,
        },
        draws: {
          home: 1,
          away: 1,
          total: 1,
        },
        loses: {
          home: 1,
          away: 1,
          total: 1,
        },
      },

      goals: {
        for: {
          total: {
            home: 1,
            away: 1,
            total: 1,
          },
          average: {
            home: 1,
            away: 1,
            total: 1,
          },
          minute: {
            '0-15': {
              total: 1,
            },
            '16-30': {
              total: 2,
            },
            '31-45': {
              total: 3,
            },
            '46-60': {
              total: 4,
            },
            '61-75': {
              total: 5,
            },
            '76-90': {
              total: 6,
            },
            '91-105': {
              total: 7,
            },
            '106-120': {
              total: 8,
            },
          },
        },
      },

      lineups: [
        {
          formation: '4-3-4',
          played: 10,
        },
        {
          formation: '4-4-3',
          played: 5,
        },
        {
          formation: '4-5-2',
          played: 1,
        },
      ],
    },
    get: '',
    parameters: undefined,
    errors: undefined,
    results: 0,
    paging: {
      current: undefined,
      total: undefined,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent, LoadingComponent, GraficoComponent],
      providers: [
        {
          provide: FootballService,
          useValue: mockFootballSerivce,
        },
      ],
      imports: [HttpClientTestingModule, NgChartsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.estatisticasTime = mockEstatisticas;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve definir a formação mais utilizada pelo time', () => {
    component.verificaFormacaoUtilizada();
    let formaMaisUtilizada = component.formaMaisUtilizada;

    expect(formaMaisUtilizada).toBe('4-3-4');
  });

  it('Deve buscar a lista de jogadores do time', () => {
    component.buscaListaDeJogadores();
    expect(mockFootballSerivce.listarJogadoresDoTime).toHaveBeenCalled();
    expect(component.listaJogadores).toEqual(mockListaJogadores);
  });

  it('Deve obter dados estatisticos de gols por minutagem para criar o gráfico de gols', () => {
    let dados: number[] = component.obterDadosParaGrafico();

    expect(dados).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });
});
