import type { FormStageGroup } from "~/components/EditStageTeams.vue";

export type TournamentForm = Pick<Tournament, 'name' | 'iconId'>;

export type TournamentStageForm = (
  Pick<BaseTournamentStage, 'name' | 'type'>
  & Pick<TournamentGroupsStage, 'format'>
  & {
    teams: number;
    teamsPerGroup: number;
    groups: number;
    groupRounds: number;
    playoffRounds: number;
  }
);

export interface StoreState {
  tournaments: Tournament[];
  activeTournamentId: Tournament['id'] | null;
}

export interface EditStageStorePayload {
  id: Tournament['id'];
  stageId: TournamentStage['id'];
  stageForm: TournamentStageForm;
}

export interface UpdateStageTeamsStorePayload {
  id: Tournament['id'];
  stageId: TournamentStage['id'];
  form: FormStageGroup[];
}
