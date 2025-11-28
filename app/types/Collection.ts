export interface Collection {
  id: number;
  name: string;
  tournaments: Tournament[];
}

export type CollectionForm = Pick<Collection, 'name'>;
