import type { PlayoffGame } from './Playoff';

export interface UpdatePlayoffRulesParams {
  id: string;
  numberOfLegs: 1 | 2;
  numberOfTeams: number;
}

export interface SavePlayoffGamesParams {
  id: string;
  games: PlayoffGame[];
}
