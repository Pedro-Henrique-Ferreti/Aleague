export enum BaseFileType {
  COLLECTION,
  TOURNAMENT,
}

export interface BaseFile {
  id: number;
  fileType: BaseFileType;
}

export type SourceFile = Collection | Tournament;