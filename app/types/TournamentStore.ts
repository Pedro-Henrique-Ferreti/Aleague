export type TournamentForm = Pick<Tournament, 'name' | 'iconId'>;

export type TournamentStageForm = (
  Pick<GroupsStageRules, 'teamsPerGroup' | 'format'>
  & Pick<BaseTournamentStage, 'name' | 'type' | 'teams'>
  & {
    groups: number;
    groupsRounds: number;
    playoffRounds: number;
  }
);

export interface StoreState {
  tournaments: Tournament[];
  activeTournamentId: Tournament['id'] | null;
}