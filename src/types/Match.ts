import type { Day } from 'date-fns';

export interface MatchTeam {
  id: string;
  name: string;
  country: string;
  isNational?: boolean;
  emblemUrl: string;
}

export interface MatchPlaceholderTeam {
  id: null;
  name: string;
}

export interface Match {
  id: string;
  gameweek: number;
  homeTeam: MatchTeam | MatchPlaceholderTeam | null;
  awayTeam: MatchTeam | MatchPlaceholderTeam | null;
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

export enum MatchOutcome {
  WIN = 'win',
  DRAW = 'draw',
  LOSS = 'loss',
  NOT_PLAYED = 'not-played',
}
