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

// Api types
export type ApiGetAllTeamsResponse = {
  id: string;
  name: string;
  country: TypeCountry;
  isFavorite: boolean;
  emblem: {
    id: string;
    url: string;
  }
}[];