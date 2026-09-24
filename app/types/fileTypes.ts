export enum SourceFileType {
  COLLECTION,
  TOURNAMENT,
}

export type Timestamp = Branded<string, 'Timestamp'>;

export type BaseFileId = Branded<number, 'BaseFileId'>;

export interface BaseFile {
  id: BaseFileId;
  type: SourceFileType;
  createdAt: Timestamp;
}

export interface CollectionFile extends BaseFile {
  type: SourceFileType.COLLECTION;
  data: Collection & {
    tournaments: Tournament[];
  };
}

export interface TournamentFile extends BaseFile {
  type: SourceFileType.TOURNAMENT;
  data: Tournament;
}

export type SourceFile = CollectionFile | TournamentFile;
