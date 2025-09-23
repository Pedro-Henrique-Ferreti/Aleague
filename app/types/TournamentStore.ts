import type { Tournament } from "./Tournament";

export type TournamentForm = Pick<Tournament, 'name' | 'iconId'>;

export interface StoreState {
  tournaments: Tournament[];
  activeTournamentId: Tournament['id'] | null;
}