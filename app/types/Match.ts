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

export interface MatchTeam {
  id: Team['id'];
  score: number | null;
}

export interface Match {
  id: string;
  homeTeam: MatchTeam;
  awayTeam: MatchTeam;
}

export interface Matchweek {
  week: number;
  matches: Match[];
}