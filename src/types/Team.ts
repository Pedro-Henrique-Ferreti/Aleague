import type { TypeCountry } from './Country';

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