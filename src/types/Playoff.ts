import type { Game, GameTeam } from './Game';

export type PlayoffLegs = 1 | 2;

export type ScoreInput = number | string | null;

export interface Playoff {
  id: string;
  name: string;
  progress: number;
  rules: null | {
    numberOfLegs: PlayoffLegs;
    numberOfRounds: number;
    numberOfTeams: number;
  },
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
  id: string;
  number: number;
  nextConfrontationId: string | null;
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
