export interface State {
  teams: TeamsStoreTeam[];
}

export interface TeamsStoreTeam {
  id: number;
  hashid: string;
  name: string;
  isFavorite: boolean;
}