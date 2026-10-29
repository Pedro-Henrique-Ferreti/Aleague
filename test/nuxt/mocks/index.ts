import { createTournamentFile, newCollectionFile } from '~/helpers/file';
import { newTournament, newTournamentStage } from '~/helpers/tournament';

export function mockPlayoffStage(params?: Partial<StageForm>) {
  return newTournamentStage({
    name: 'Playoffs',
    type: StageType.PLAYOFF,
    groupNameFormat: GroupStageNameFormat.NUMBER,
    groups: 0,
    playoffRounds: 2,
    teams: 4,
    teamsPerGroup: 0,
    ...params,
  }) as PlayoffStage;
}

export function mockTournamentFile(params?: Partial<TournamentForm>): TournamentFile {
  return createTournamentFile(newTournament({
    collectionId: null,
    icon: '',
    name: '',
    showCountry: false,
    tags: [],
    ...params,
  }));
}

export function mockCollectionFile(params?: Partial<CollectionForm>): CollectionFile {
  return newCollectionFile({
    name: '',
    ...params,
  });
}
