const FILE_SUFFIX_REGEX = /\(\d+\)/;

export const newBaseFileId = (): BaseFile['id'] => uuidv4();

export const newTimestamp = (): Timestamp => new Date().toISOString() as Timestamp;

export function appendNumericSuffix(name: Tournament['name'], tournaments: Tournament[]) {
  const removeSuffix = (str: string) => str.replace(FILE_SUFFIX_REGEX, '').trim();

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
    updatedAt: null,
    data: tournament,
  };
}

export function newCollectionFile(payload: CollectionForm): CollectionFile {
  const timestamp = newTimestamp();
  return {
    id: newBaseFileId(),
    createdAt: timestamp,
    updatedAt: null,
    type: SourceFileType.COLLECTION,
    data: {
      name: payload.name,
      tournaments: [],
    },
  };
}

export function setUpdatedAtTimestampIfDirty(file: SourceFile, snapshot: SourceFile) {
  if (!hasChanges(file, snapshot)) return;

  const timestamp = newTimestamp();

  file.updatedAt = timestamp;

  if (isTournamentFile(file)) {
    file.data.updatedAt = timestamp;
    return;
  }

  if (!isCollectionFile(file) || !isCollectionFile(snapshot)) return;

  for (const tournament of file.data.tournaments) {
    const snapshotTournament = snapshot.data.tournaments.find(t => t.id === tournament.id);

    if (snapshotTournament && hasChanges(tournament, snapshotTournament)) {
      tournament.updatedAt = timestamp;
    }
  }
}
