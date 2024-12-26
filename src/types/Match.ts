import type { Day } from 'date-fns';

export interface MatchTeam {
  id: string;
  name: string;
  emblem: {
    url: string;
  };
}

export interface Match {
  id: string;
  gameweek: number;
  homeTeam: MatchTeam | null;
  awayTeam: MatchTeam | null;
  awayTeamScore: number | null;
  homeTeamScore: number | null;
  weekDay: Day;
  time: string;
}

export interface FinishedMatch extends Match {
  homeTeam: MatchTeam;
  awayTeam: MatchTeam;
  awayTeamScore: number;
  homeTeamScore: number;
}

export interface FinishedMatch extends Match {
  homeTeam: MatchTeam;
  awayTeam: MatchTeam;
  awayTeamScore: number;
  homeTeamScore: number;
}
