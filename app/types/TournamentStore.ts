import type { Tournament } from "./Tournament";

export type TournamentForm = Omit<Tournament, 'id' | 'createdAt' | 'updatedAt'>;

export interface StoreState {
  tournaments: Tournament[];
}