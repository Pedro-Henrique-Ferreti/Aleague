import type { TeamPackListItem } from './TeamPack';

export interface State {
  teams: TeamListItem[];
  teamPacks: TeamPackListItem[];
  searchBarValue: string;
}

export interface TeamListItem {
  id: number;
  hashid: string;
  name: string;
  isFavorite: boolean;
}
