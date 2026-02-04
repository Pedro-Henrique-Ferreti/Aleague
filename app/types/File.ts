export enum SourceFileType {
  COLLECTION,
  TOURNAMENT,
}

export interface BaseFile {
  id: number;
  fileType: SourceFileType;
  createdAt: string;
}

export type SourceFile = Collection | Tournament;