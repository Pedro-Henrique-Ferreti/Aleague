export const newBaseFileId = (): BaseFile['id'] => uuidv4();

export const newTimestamp = (): Timestamp => new Date().toISOString() as Timestamp;

export function appendNumericSuffix(name: Tournament['name'], tournaments: Tournament[]) {
  const removeSuffix = (str: string) => str.replace(/\(\d+\)/, '').trim();

  const parsedName = removeSuffix(name);
  const sameNameCount = tournaments.filter(t => removeSuffix(t.name).startsWith(parsedName)).length;

  return `${parsedName} (${sameNameCount + 1})`;
}

export function isTournamentFile(file: SourceFile): file is TournamentFile {
  return file.type === SourceFileType.TOURNAMENT;
}

export function isCollectionFile(file: SourceFile): file is CollectionFile {
  return file.type === SourceFileType.COLLECTION;
}

export function createTournamentFile(tournament: Tournament): TournamentFile {
  return {
    id: tournament.id,
    type: SourceFileType.TOURNAMENT,
    createdAt: tournament.createdAt,
    data: tournament,
  };
}

export function createCollectionFile(collection: Collection, tournamentList: Tournament[]): CollectionFile {
  return {
    id: collection.id,
    type: SourceFileType.COLLECTION,
    createdAt: collection.createdAt,
    data: {
      id: collection.id,
      name: collection.name,
      createdAt: collection.createdAt,
      tournaments: tournamentList.filter(t => t.collectionId === collection.id),
    },
  };
}
