export interface MatchTeam {
  id: Team['id'];
  score: number | null;
}

export interface Match {
  id: number;
  homeTeam: MatchTeam;
  awayTeam: MatchTeam;
}

export interface Matchweek {
  week: number;
  matches: Match[];
}