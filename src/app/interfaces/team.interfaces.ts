import { IResponseApi } from './response.interface';

export interface ITeams extends IResponseApi {
  response: [
    {
      team: ITeam;
    }
  ];
}

export interface ITeamStatics extends IResponseApi {
  response: {
    league: {
      id: string | number;
      name: string;
      country: string;
      logo: string;
      flag: string;
      season: number;
    };

    team: {
      id: string | number;
      name: string;
      logo: string;
    };

    form: string;

    fixtures: {
      played: IResultsGames;
      wins: IResultsGames;
      draws: IResultsGames;
      loses: IResultsGames;
    };

    goals: {
      for: {
        total: IResultsGames;
        average: IResultsGames;
        minute: {
          '0-15': IPercentages;
          '16-30': IPercentages;
          '31-45': IPercentages;
          '46-60': IPercentages;
          '61-75': IPercentages;
          '76-90': IPercentages;
          '91-105': IPercentages;
          '106-120': IPercentages;
        };
      };
    };

    lineups: ILineups[];
  };
}

export interface ITeam {
  id: number;
  name: string;
  code: string;
  country: string;
  founded: number;
  national: boolean;
  logo: string;
}

interface IResultsGames {
  home: number | string;
  away: number | string;
  total: number | string;
}

interface IPercentages {
  total: number | null;
  percentage?: string | null;
}

interface ILineups {
  formation: string;
  played: number;
}
