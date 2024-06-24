export interface TeamListItem {
  id: string;
  name: string;
  country: string;
  isFavorite: boolean;
  emblem: {
    id: string;
    url: string;
  }
}