export interface Collection {
  id: ExportableFile['id'];
  name: string;
  tournaments: Tournament[];
}

export type CollectionForm = Pick<Collection, 'name'>;
