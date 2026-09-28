import { getGroupName } from './group-stage';

export function newStageSeedingForm(stage?: TournamentStage): StageSeedingForm {
  let groups: StageSeedingForm['groups'] = [];

  if (stage?.type === StageType.GROUP) {
    groups = stage.groups.map(group => ({
      order: group.order,
      name: getGroupName(group.order, stage.nameFormat),
      teams: group.standings.map(entry => entry.team),
    }));
  } else if (stage?.type === StageType.PLAYOFF) {
    groups = stage.rounds[0]!.slots.map(({ legs: [match] }, index) => ({
      name: `Partida ${index + 1}`,
      order: index + 1,
      teams: [match.homeTeam.id, match.awayTeam.id],
    }));
  }

  return {
    groups,
  };
}
