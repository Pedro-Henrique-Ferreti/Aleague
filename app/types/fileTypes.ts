export enum SourceFileType {
  COLLECTION,
  TOURNAMENT,
}

export type Timestamp = Branded<string, 'Timestamp'>;

export interface BaseFile {
  id: UUID;
  type: SourceFileType;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface CollectionFile extends BaseFile {
  type: SourceFileType.COLLECTION;
  data: Collection;
}

export interface TournamentFile extends BaseFile {
  type: SourceFileType.TOURNAMENT;
  data: Tournament;
}

export type SourceFile = CollectionFile | TournamentFile;
