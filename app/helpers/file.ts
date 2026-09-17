import type { Timestamp } from '~/types/fileTypes';

export const getBaseFileId = (): BaseFile['id'] => new Date().getTime();

export const getTimestamp = (): Timestamp => new Date().toISOString() as Timestamp;

export function appendNumericSuffix(name: Tournament['name'], tournaments: Tournament[]) {
  const removeSuffix = (str: string) => str.replace(/\(\d+\)/, '').trim();

  const parsedName = removeSuffix(name);
  const sameNameCount = tournaments.filter(t => removeSuffix(t.name).startsWith(parsedName)).length;

  return `${parsedName} (${sameNameCount + 1})`;
}

export function createTournamentFile(tournament: Tournament): TournamentFile {
  return {
    id: tournament.id,
    type: SourceFileType.TOURNAMENT,
    createdAt: tournament.createdAt,
    data: tournament,
  };
}
