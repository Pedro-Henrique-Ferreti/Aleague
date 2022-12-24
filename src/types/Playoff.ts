import type { Game, GameTeam } from './Game';

export type PlayoffLegs = 1 | 2;

export interface Playoff {
  id: number;
  hashid: string;
  name: string;
  numberOfTeams: number | null;
	numberOfLegs: PlayoffLegs | null,
	numberOfRounds: number | null,
  progress: number;
  createdAt: string;
  updatedAt: string;
}

export interface PlayoffGame extends Game {
  homeTeamId: number | null;
  awayTeamId: number | null;
  homeTeamName: string | null;
  awayTeamName: string | null;
  homeTeamScore: number | null;
  awayTeamScore: number | null;
  homeTeamPenaltyShootoutScore: number | null;
  awayTeamPenaltyShootoutScore: number | null;
}

export type PlayoffConfrontation = PlayoffGame[];

export interface PlayoffStanding {
  number: number;
  numberOfLegs: PlayoffLegs;
  confrontations: PlayoffConfrontation[];
}

export interface PlayoffWithStandings extends Playoff {
  standings: PlayoffStanding[];
}
