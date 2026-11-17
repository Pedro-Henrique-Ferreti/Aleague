export interface Collection {
  name: string;
  tournaments: Record<Tournament['id'], Tournament>;
};

export type CollectionForm = Pick<Collection, 'name'>;
