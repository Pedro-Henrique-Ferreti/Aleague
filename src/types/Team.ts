import type { TypeCountry } from './Country';

export enum TeamType {
  CLUB = 'club',
  NATIONAL = 'national-team',
  CUSTOM = 'custom',
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
