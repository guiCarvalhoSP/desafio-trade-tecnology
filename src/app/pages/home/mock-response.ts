import { ICountry } from "src/app/interfaces/country.interface";
import { ILeagues } from "src/app/interfaces/leagues.interface";
import { IPlayers } from "src/app/interfaces/player.interface";
import { ITeamStatics, ITeams } from "src/app/interfaces/team.interfaces";

export const mockCountry: ICountry =  {
  response: [
    {
      name: 'Nome pais',
      code: '1',
      flag: 'url',
    }
  ],
  get: 'string',
  parameters: undefined,
  errors: undefined,
  results: 0,
  paging: {
    current: undefined,
    total: undefined
  }
}

export const mockLeagues: ILeagues = {
  response: [
    {
      league: {
        id: 'string',
        name: 'string',
        type: 'string',
        logo: 'string'
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
          }
        }
      ]
    }
  ],
  get: 'string',
  parameters: undefined,
  errors: undefined,
  results: 0,
  paging: {
    current: undefined,
    total: undefined
  }
}

export const mockTimes: ITeams = {
  response: [
    {
      team: {
        id: 1,
        name: 'string',
        code: 'string',
        country: 'string',
        founded: 0,
        national: false,
        logo: 'string'
      }
    }
  ],
  get: 'string',
  parameters: undefined,
  errors: undefined,
  results: 0,
  paging: {
    current: undefined,
    total: undefined
  }
}

export const mockEstatisticas: ITeamStatics = {
  get: 'string',
  parameters: undefined,
  errors: undefined,
  results: 0,
  paging: {
    current: undefined,
    total: undefined
  },
  response: {
    league: {
      id: 1,
      name: 'string',
      country: 'string',
      logo: 'string',
      flag: 'string',
      season: 2023
    },

    team: {
      id: 1,
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
  }
}

export const mockPlayers: IPlayers = {
  response: [
    {
      player: {
        name: "string",
        firstname: "string",
        age: 20,
        nationality: "string"
      }

    }
  ],
  get: "",
  parameters: undefined,
  errors: undefined,
  results: 0,
  paging: {
    current: undefined,
    total: undefined
  }
}