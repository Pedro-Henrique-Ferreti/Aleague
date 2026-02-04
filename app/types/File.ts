export enum SourceFileType {
  COLLECTION,
  TOURNAMENT,
}

export interface BaseFile {
  id: number;
  type: SourceFileType;
  createdAt: string;
}

export interface CollectionFile extends BaseFile {
  type: SourceFileType.COLLECTION;
  data: Omit<Collection, 'tournaments'> & {
    tournaments: Tournament[];
  };
}

export interface TournamentFile extends BaseFile {
  type: SourceFileType.TOURNAMENT;
  data: Tournament;
}

export type SourceFile = CollectionFile | TournamentFile;