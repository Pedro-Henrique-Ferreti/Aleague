import type { Game } from './Game';

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
export interface LeagueSteps {
  first: boolean;
  second: boolean;
  third: boolean;
}

export interface LeagueParticipant {
  id: number,
  name: string;
  created: boolean;
}

export interface League {
  id: number;
  hashid: string;
  name: string;
  numberOfTeams: number | null;
  progress: number;
  createdAt: string;
  updatedAt: string;
}

export interface LeagueWithStandings extends League {
  numberOfGameweeks: number;
  standings: Standing[] | null,
}

export interface LeagueListItem extends League {
  stepsCompleted: LeagueSteps;
}
