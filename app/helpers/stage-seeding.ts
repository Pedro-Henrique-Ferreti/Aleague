import { getGroupName } from './group-stage';

export function getTeamSeedingGroups(stageOrRound: TournamentStage | PlayoffRound): TeamSeedingGroup[] {
  if ('groups' in stageOrRound) {
    return stageOrRound.groups.map(group => ({
      order: group.order,
      name: getGroupName(group.order, stageOrRound.nameFormat),
      teams: group.standings.map(entry => entry.team),
    }));
  }

  const round = 'rounds' in stageOrRound ? stageOrRound.rounds[0] : stageOrRound;

  return round.slots.map(({ legs: [match] }, index) => ({
    name: `Partida ${index + 1}`,
    order: index + 1,
    teams: [match.homeTeam.id, match.awayTeam.id],
  }));
}

export function newStageSeedingForm(stage?: TournamentStage): StageSeedingForm {
  return {
    groups: stage ? getTeamSeedingGroups(stage) : [],
  };
}
