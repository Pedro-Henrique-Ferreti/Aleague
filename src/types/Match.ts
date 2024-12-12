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
  homeTeam: MatchTeam;
  awayTeam: MatchTeam;
  awayTeamScore: number | null;
  homeTeamScore: number | null;
  weekDay: '0' | '1' | '2' | '3' | '4' | '5' | '6';
  hour: string;
}
