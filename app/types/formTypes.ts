export type TournamentForm = Pick<Tournament, 'name' | 'icon' | 'tags' | 'showCountry'>;

export interface StageForm extends Pick<BaseStage, 'name' | 'type'> {
  teams: number;
  teamsPerGroup: number;
  groups: number;
  playoffRounds: number;
  groupNameFormat: GroupStageNameFormat;
}

export interface StageTeamsForm {
  groups: {
    order: number;
    teams: StandingsEntry['team'][];
  }[];
}
