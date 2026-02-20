export interface StageTeamsForm {
  groups: {
    order: number;
    teams: StandingsEntry['team'][];
  }[];
}
