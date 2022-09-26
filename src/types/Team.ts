export interface Team {
  id: number;
  name: string;
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamListItem {
  id: number;
  hashid: string;
  name: string;
  isFavorite: boolean;
}

export interface TeamToBeCreated {
  name: string;
}
