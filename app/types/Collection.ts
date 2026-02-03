export interface Collection extends ExportableFile {
  name: string;
  tournaments: Tournament[];
}

export type CollectionForm = Pick<Collection, 'name'>;
