export enum TournamentFormat {
  ALL_PLAY_ALL = 'all-play-all',
  PLAYOFFS = 'playoffs',
  CUSTOM = 'custom',
}

export interface Tournament {
  id: number;
  name: string;
  format: TournamentFormat;
}