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
  emblemUrl: string;
}

export interface TeamDetails {
  id: string;
  isFavorite: boolean;
  name: string;
  country: TypeCountry;
  createdAt: string;
  updatedAt: string;
  emblemUrl: string;
  rivals: RivalTeam[];
}

export interface TeamPreview {
  id: string;
  name: string;
  country: TypeCountry;
  isFavorite: boolean;
  isNational: boolean;
  isSystemTeam: boolean;
  emblemUrl: string;
}
