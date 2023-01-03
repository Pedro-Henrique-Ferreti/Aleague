import type { Game, GameTeam } from './Game';

export type PlayoffLegs = 1 | 2;

export type ScoreInput = number | string | null;

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
  homeTeam: GameTeam | null;
  awayTeam: GameTeam | null;
  homeTeamScore: ScoreInput;
  awayTeamScore: ScoreInput;
  homeTeamPenaltyShootoutScore: ScoreInput;
  awayTeamPenaltyShootoutScore: ScoreInput;
}

export type PlayoffConfrontationGames = [PlayoffGame, PlayoffGame?];

export interface PlayoffConfrontation {
  id: number;
  number: number;
  nextConfrontationId: number | null;
  games: PlayoffConfrontationGames;
}

export interface PlayoffRound {
  number: number;
  numberOfLegs: PlayoffLegs;
  confrontations: PlayoffConfrontation[];
}

export interface PlayoffWithRounds extends Playoff {
  rounds: PlayoffRound[];
}
