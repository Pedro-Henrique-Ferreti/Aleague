export interface LeagueListItem {
  id: number;
  hashid: string;
  name: string;
  hasGames: boolean;
  gamesCount: number;
  completedGamesCount: number;
  numberOfGameweeks: number | null;
  numberOfTeams: number | null;
  stepsCompleted: LeagueListItemSteps;
  createdAt: string;
  updatedAt: string;
}

export interface LeagueListItemSteps {
  first: boolean;
  second: boolean;
  third: boolean;
}
