import type { PlayoffGame } from './Playoff';

export interface UpdatePlayoffRulesParams {
  hashId: string;
  numberOfLegs: 1 | 2;
  numberOfTeams: number;
}

export interface SavePlayoffGamesParams {
  hashId: string;
  games: PlayoffGame[];
}
