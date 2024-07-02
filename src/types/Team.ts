import type { TypeCountry } from './Country';

export interface TeamListItem {
  id: string;
  name: string;
  country: TypeCountry;
  isFavorite: boolean;
  emblem: {
    id: string;
    url: string;
  }
}