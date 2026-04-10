export type Collection = Pick<CollectionFile, 'id' | 'createdAt'> & {
  name: string;
};

export type CollectionForm = Pick<Collection, 'name'>;
