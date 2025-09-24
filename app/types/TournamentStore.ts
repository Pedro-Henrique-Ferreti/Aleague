export type TournamentForm = Pick<Tournament, 'name' | 'iconId'>;

export type TournamentStageForm = (
  Pick<GroupsStageRules, 'teamsPerGroup' | 'format' | 'groups'>
  & Pick<BaseTournamentStage, 'name' | 'type' | 'teams'>
  & {
    groupsRounds: number;
    playoffRounds: number;
  }
);

export interface StoreState {
  tournaments: Tournament[];
  activeTournamentId: Tournament['id'] | null;
}