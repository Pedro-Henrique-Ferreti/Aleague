export type Collection = Pick<CollectionFile, 'id' | 'createdAt'> & {
  name: string;
  tournaments: Tournament['id'][];
}

export type CollectionForm = Pick<Collection, 'name'>;
