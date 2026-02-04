export enum BaseFileType {
  COLLECTION,
  TOURNAMENT,
}

export interface BaseFile {
  id: number;
  fileType: BaseFileType;
  createdAt: string;
}

export type SourceFile = Collection | Tournament;