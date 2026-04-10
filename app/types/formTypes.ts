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

export interface StageTeamsForm {
  groups: {
    order: number;
    teams: StandingsEntry['team'][];
  }[];
}
