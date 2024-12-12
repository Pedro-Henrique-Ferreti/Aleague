export interface GameTeam {
  id: string;
  name: string;
}

export interface Game {
  id: string;
  gameweek: number;
  homeTeam: GameTeam;
  awayTeam: GameTeam;
  awayTeamScore: number | null;
  homeTeamScore: number | null;
  weekDay: '0' | '1' | '2' | '3' | '4' | '5' | '6';
  hour: string;
}
