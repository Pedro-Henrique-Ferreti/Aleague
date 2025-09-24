import type { BaseTournamentStage, Tournament } from "./Tournament";

export type TournamentForm = Pick<Tournament, 'name' | 'iconId'>;

export interface TournamentStageForm {
  name: BaseTournamentStage['name'];
  type: BaseTournamentStage['type'];
}

export interface StoreState {
  tournaments: Tournament[];
  activeTournamentId: Tournament['id'] | null;
}