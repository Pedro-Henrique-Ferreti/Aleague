import type { TypeCountry } from './Country';

export interface TeamList {
  id: string;
  name: string;
  icon: string;
  teams: {
    name: string;
    country: TypeCountry;
    emblem_url: string;
    exists: boolean;
  }[];
}

export interface TeamEmblem {
  id: string;
  url: string;
  createdAt: string;
  isSystemEmblem: boolean;
  isDefaultEmblem: boolean;
}

export interface TeamToBeCreated {
  name: string;
  country: TypeCountry;
  emblem: TeamEmblem;
}

export interface RivalTeam {
  id: string;
  name: string;
  country: TypeCountry;
  emblem: {
    id: string;
    url: string;
  };
}

export interface TeamDetails {
  id: string;
  isFavorite: boolean;
  name: string;
  country: TypeCountry;
  createdAt: string;
  updatedAt: string;
  emblem: {
    id: string;
    url: string;
  };
  rivals: RivalTeam[];
}

export interface TeamPreview {
  id: string;
  name: string;
  country: TypeCountry;
  isFavorite: boolean;
  isNational: boolean;
  isSystemTeam: boolean;
  emblem: {
    id: string | null;
    url: string;
  };
}

// Api types
export interface ApiTeamToBeCreated {
  id: number;
  name: string;
  country: TypeCountry;
  emblem: TeamEmblem;
}
