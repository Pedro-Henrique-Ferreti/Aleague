import { newTournamentStage } from '~/helpers/tournament';

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
