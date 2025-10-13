export enum MatchweekKickoff {
  WEEKDAY,
  WEEKEND,
}

export enum Weekday {
  SUNDAY,
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
}

export enum MatchResult {
  WON,
  DRAW,
  LOST,
}

export type MatchKickoff = string;

export interface MatchTeam {
  id: Team['id'] | null;
  score: number | null;
}

export interface Match {
  id: string;
  homeTeam: MatchTeam;
  awayTeam: MatchTeam;
  kickoff: MatchKickoff | null;
}

export interface Matchweek {
  week: number;
  matches: Match[];
}