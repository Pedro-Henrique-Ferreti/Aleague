import type { StageTeamsFormGroup } from '@/components/StageTeamsModal.vue';

export type TournamentForm = Pick<Tournament, 'name' | 'icon' | 'tags' | 'showCountry'>;

export type StageForm = (
  Pick<BaseStage, 'name' | 'type'>
  & {
    teams: number;
    teamsPerGroup: number;
    groups: number;
    playoffRounds: number;
  }
);

export interface UpdateStageTeamsStorePayload {
  id: Tournament['id'];
  stageId: TournamentStage['id'];
  form: StageTeamsFormGroup[];
}

export interface ReplaceTeamsInMatchweeksParams {
  id: Tournament['id'];
  stageId: TournamentStage['id'];
  queries: {
    search: TeamDetails['id'];
    replace: TeamDetails['id'];
  }[];
}
