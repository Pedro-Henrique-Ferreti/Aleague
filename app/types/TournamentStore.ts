export type TournamentForm = Pick<Tournament, 'name' | 'iconId'>;

export type TournamentStageForm = (
  Pick<GroupsStageRules, 'format'>
  & Pick<BaseTournamentStage, 'name' | 'type' | 'teams'>
  & {
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