export interface UpdateLeagueRulesParams {
  hashId: string;
  numberOfTeams: number;
  awayGames: boolean;
}

export interface SaveLeagueGamesParams {
  leagueId: string;
  games: {
    id: number;
    homeTeamScore: number;
    awayTeamScore: number;
  }[];
}

export interface UpdatePlayoffRulesParams {
  hashId: string;
  numberOfLegs: 1 | 2;
  numberOfRounds: number;
}
