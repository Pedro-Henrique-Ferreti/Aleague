export type Collection = Pick<CollectionFile, 'id' | 'createdAt'> & {
  name: string;
  tournaments: Tournament[];
};

export type CollectionForm = Pick<Collection, 'name'>;
