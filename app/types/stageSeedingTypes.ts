export interface TeamSeedingGroup {
  order: number;
  name: string;
  teams: StandingsEntry['team'][];
}

export interface StageSeedingForm {
  groups: TeamSeedingGroup[];
}
