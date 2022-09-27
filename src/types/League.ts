import type { Game } from './Game';

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

export interface Standing {
  gamesDrawn: number;
  gamesLost: number;
  gamesPlayed: number;
  gamesWon: number;
  goalDifference: number;
  goalsAgainst: number;
  goalsFor: number;
  points: number;
  recentGames: Game[];
  teamHashid: string;
  teamId: number;
  teamName: string;
}

export interface LeagueWithStandings extends League {
  standings: Standing[] | null,
}

export interface LeagueListItem extends League {
  hasGames: boolean;
  gamesCount: number;
  completedGamesCount: number;
  stepsCompleted: LeagueSteps;
}

export interface LeagueParticipant {
  id: number,
  name: string;
  created: boolean;
}
