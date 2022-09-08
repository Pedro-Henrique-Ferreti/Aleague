import type { TeamPackListItem } from './TeamPack';

export interface State {
  teams: TeamsStoreTeam[];
  teamPacks: TeamPackListItem[];
  searchBarValue: string;
}

export interface TeamsStoreTeam {
  id: number;
  hashid: string;
  name: string;
  isFavorite: boolean;
}
