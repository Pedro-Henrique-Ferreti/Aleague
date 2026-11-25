import { newTournament, newTournamentStage } from '~/features/tournament/helpers/tournament';

export function mockPlayoffStage(params?: Partial<StageForm>, currentStages?: Tournament['stages']) {
  return newTournamentStage({
    name: 'Playoffs',
    type: StageType.PLAYOFF,
    groupNameFormat: GroupStageNameFormat.NUMBER,
    groups: 0,
    playoffRounds: 2,
    teams: 4,
    teamsPerGroup: 0,
    ...params,
  }, currentStages) as PlayoffStage;
}

export function mockTournament(params?: Partial<TournamentForm>): Tournament {
  return newTournament({
    icon: '',
    name: '',
    showCountry: false,
    tags: [],
    ...params,
  });
}
