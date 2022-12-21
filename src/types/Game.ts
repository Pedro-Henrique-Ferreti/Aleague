export interface GameTeam {
  id: number;
  hashid: string;
  name: string;
}

export interface Game {
  id: number;
  hour: string;
  weekday: '1' | '2' | '3' | '4' | '5' | '6' | '7';
}
