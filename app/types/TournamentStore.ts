import type { Tournament } from "./Tournament";

export type TournamentForm = Omit<Tournament, 'id'>;

export interface StoreState {
  tournaments: Tournament[];
}