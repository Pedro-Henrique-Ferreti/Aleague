export interface Collection extends BaseFile {
  fileType: SourceFileType.COLLECTION;
  name: string;
  tournaments: Tournament[];
}

export type CollectionForm = Pick<Collection, 'name'>;
