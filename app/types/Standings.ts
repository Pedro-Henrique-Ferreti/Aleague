export enum Qualifier {
  NONE,
  GREEN,
  BLUE,
  ORANGE,
  RED,
}

export enum TableEntrySortType {
  POINTS,
  WON,
  LOST,
  GOALS_FOR,
  GOALS_AGAINST,
  GOALS_DIFFERENCE,
}

export enum TableEntryType {
  OVERALL,
  HOME,
  AWAY,
}

export enum TableEntryView {
  PER_GROUP,
  OVERALL,
}

export interface StandingsData {
  points: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
}

export interface StandingsEntry {
  id: string;
  team: Team['id'] | null;
  home: StandingsData;
  away: StandingsData;
}

export type TableEntry = Pick<StandingsEntry, 'id' | 'team'> & StandingsData & {
  form: MatchResult[];
};

