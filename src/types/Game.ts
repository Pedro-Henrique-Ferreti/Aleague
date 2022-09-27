export interface GameTeam {
  id: number;
  hashid: string;
  name: string;
}

export interface Game {
  id: number;
  awayTeam: GameTeam;
  homeTeam: GameTeam;
  awayTeamScore: number;
  homeTeamScore: number;
  gameweek: number;
  hour: string;
  weekday: string;
}
