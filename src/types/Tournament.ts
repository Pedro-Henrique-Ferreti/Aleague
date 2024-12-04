import { TournamentFormat } from '@/constants/tournament';
import type { ValueOf } from './Auth';

export type TypeTournamentFormat = ValueOf<typeof TournamentFormat>;

// API types
export type ApiGetAllTournamentsResponse = {
  id: string;
  name: string;
  type: TypeTournamentFormat;
  icon: number;
  startedAt: string | null;
  createdAt: string;
  updatedAt: string;
  numberOfTeams: number;
  progress: number;
}[];

export interface ApiCreateAllPlayAllTournamentPayload {
  name: string;
  icon: number;
  numberOfTeams: number;
  hasTwoLegs: boolean;
}
