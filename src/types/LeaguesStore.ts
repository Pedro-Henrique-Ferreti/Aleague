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
