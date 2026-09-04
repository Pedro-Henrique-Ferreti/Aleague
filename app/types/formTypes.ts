export type TournamentForm = Pick<Tournament, 'name' | 'icon' | 'tags' | 'showCountry' | 'collectionId'>;

export interface StageForm extends Pick<BaseStage, 'name' | 'type'> {
  teams: number;
  teamsPerGroup: number;
  groups: number;
  playoffRounds: number;
  groupNameFormat: GroupStageNameFormat;
}

export interface StageSeedingForm {
  groups: {
    order: number;
    teams: StandingsEntry['team'][];
  }[];
}
