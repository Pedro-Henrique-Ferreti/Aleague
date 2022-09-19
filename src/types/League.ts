export interface League {
  id: number;
  hashid: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  numberOfGameweeks: number | null;
  numberOfTeams: number | null;
}

export interface LeagueSteps {
  first: boolean;
  second: boolean;
  third: boolean;
}

export interface LeagueListItem extends League {
  hasGames: boolean;
  gamesCount: number;
  completedGamesCount: number;
  stepsCompleted: LeagueSteps;
}
