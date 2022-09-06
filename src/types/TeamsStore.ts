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

export interface GetTeamsResponse {
  data: TeamsStoreTeam[];
  links: {
    first: string;
    last: string | null;
    next: string | null;
    prev: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    path: string;
    per_page: number;
    to: number;
  }
}