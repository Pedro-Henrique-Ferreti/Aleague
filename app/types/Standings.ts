export enum Qualification {
  NONE,
  GREEN,
  BLUE,
  ORANGE,
  RED,
}

export interface StandingsEntry {
  id: number;
  position: number;
  points: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  team: Team['id'] | null;
  // recentGames: FinishedMatch[];
}
