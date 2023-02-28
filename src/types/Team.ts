export interface Team {
  id: string;
  name: string;
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamListItem {
  id: string;
  name: string;
  isFavorite: boolean;
}

export interface TeamToBeCreated {
  name: string;
}
