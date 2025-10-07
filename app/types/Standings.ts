export enum Qualification {
  NONE,
  GREEN,
  BLUE,
  ORANGE,
  RED,
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
