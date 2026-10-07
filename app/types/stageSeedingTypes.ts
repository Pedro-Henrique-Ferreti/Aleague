export interface TeamSeedingGroup {
  order: number;
  name: string;
  teams: StandingsEntry['team'][];
  slotId: PlayoffRoundSlot['id'] | null;
}

export interface StageSeedingForm {
  groups: TeamSeedingGroup[];
}
