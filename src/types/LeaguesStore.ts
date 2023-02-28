export interface UpdateLeagueRulesParams {
  id: string;
  numberOfTeams: number;
  awayGames: boolean;
}

export interface SaveLeagueGamesParams {
  leagueId: string;
  games: {
    id: string;
    homeTeamScore: number;
    awayTeamScore: number;
  }[];
}
