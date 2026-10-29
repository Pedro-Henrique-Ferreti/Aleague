export interface Collection {
  name: string;
  tournaments: Tournament[];
};

export type CollectionForm = Pick<Collection, 'name'>;
