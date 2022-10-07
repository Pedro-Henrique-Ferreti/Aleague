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
  weekday: '1' | '2' | '3' | '4' | '5' | '6' | '7';
}

export interface Gameweek {
  gameweek: number;
  games: Game[];
}
