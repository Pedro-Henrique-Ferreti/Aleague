export enum Qualification {
  NONE,
  GREEN,
  BLUE,
  ORANGE,
  RED,
}

export enum OrderingCriteria {
  POINTS,
  WON,
  LOST,
  GOALS_FOR,
  GOALS_AGAINST,
  GOALS_DIFFERENCE,
}

export enum StandingsType {
  OVERALL,
  HOME,
  AWAY,
}

export interface StandingsFilters {
  type: StandingsType;
  ordering: OrderingCriteria;
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
  id: number;
  team: Team['id'] | null;
  home: StandingsData;
  away: StandingsData;
  // recentGames: FinishedMatch[];
}
