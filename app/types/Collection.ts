export interface Collection extends BaseFile {
  name: string;
  tournaments: Tournament[];
}

export type CollectionForm = Pick<Collection, 'name'>;
