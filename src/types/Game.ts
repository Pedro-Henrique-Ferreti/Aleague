export interface GameTeam {
  id: string;
  name: string;
}

export interface Game {
  id: string;
  hour: string;
  weekday: '1' | '2' | '3' | '4' | '5' | '6' | '7';
}
