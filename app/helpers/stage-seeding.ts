import { getGroupName } from './group-stage';

export function getTeamSeedingGroups(stageOrRound: PlayoffRound | GroupStage): TeamSeedingGroup[] {
  if ('slots' in stageOrRound) {
    return stageOrRound.slots.map(({ legs: [match] }, index) => ({
      name: `Partida ${index + 1}`,
      order: index + 1,
      teams: [match.homeTeam.id, match.awayTeam.id],
    }));
  }

  return stageOrRound.groups.map(group => ({
    order: group.order,
    name: getGroupName(group.order, stageOrRound.nameFormat),
    teams: group.standings.map(entry => entry.team),
  }));
}

export function newStageSeedingForm(stage?: TournamentStage): StageSeedingForm {
  let groups: StageSeedingForm['groups'] = [];

  if (stage?.type === StageType.GROUP) {
    groups = getTeamSeedingGroups(stage);
  } else if (stage?.type === StageType.PLAYOFF) {
    groups = getTeamSeedingGroups(stage.rounds[0]);
  }

  return {
    groups,
  };
}
