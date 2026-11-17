import { newCollectionFile, newTournamentFile } from '~/features/files/helpers/file';
import { mockTournament } from './tournament';

export function mockTournamentFile(params?: Partial<TournamentForm>): TournamentFile {
  return newTournamentFile(mockTournament(params));
}

export function mockCollectionFile(params?: Partial<CollectionForm>): CollectionFile {
  return newCollectionFile({
    name: '',
    ...params,
  });
}
