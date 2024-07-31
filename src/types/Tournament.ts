import type { ValueOf } from './Auth';
import { TournamentFormat } from '@/constants/tournament';

export type TypeTournamentFormat = ValueOf<typeof TournamentFormat>;

// API types
export interface ApiCreateAllPlayAllTournamentPayload {
  name: string;
  icon: number;
  numberOfTeams: number;
  hasTwoLegs: boolean;
}
