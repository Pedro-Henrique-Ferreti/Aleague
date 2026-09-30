import { getGroupName } from './group-stage';

export function getTeamSeedingGroups(stageOrRound: TournamentStage | PlayoffRound, resetSeeding?: boolean): TeamSeedingGroup[] {
  if ('groups' in stageOrRound) {
    return stageOrRound.groups.map(group => ({
      order: group.order,
      name: getGroupName(group.order, stageOrRound.nameFormat),
      teams: group.standings.map(entry => resetSeeding ? null : entry.team),
    }));
  }

  const round = 'rounds' in stageOrRound ? stageOrRound.rounds[0] : stageOrRound;

  return round.slots.map(({ legs: [match] }, index) => ({
    name: `Partida ${index + 1}`,
    order: index + 1,
    teams: resetSeeding ? [null, null] : [match.homeTeam.id, match.awayTeam.id],
  }));
}

export function newStageSeedingForm(stage?: TournamentStage): StageSeedingForm {
  return {
    groups: stage ? getTeamSeedingGroups(stage) : [],
  };
}
