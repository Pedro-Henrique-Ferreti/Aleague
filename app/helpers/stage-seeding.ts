import { getGroupName } from './group-stage';

export function getTeamSeedingGroups(stageOrRound: TournamentStage | PlayoffRound, resetSeeding?: boolean): TeamSeedingGroup[] {
  if ('groups' in stageOrRound) {
    return stageOrRound.groups.map(group => ({
      order: group.order,
      name: getGroupName(group.order, stageOrRound.nameFormat),
      teams: group.standings.map(entry => resetSeeding ? null : entry.team),
      slotId: null,
    }));
  }

  const round = 'rounds' in stageOrRound ? stageOrRound.rounds[0] : stageOrRound;

  return round.slots.map((slot, index) => ({
    name: `Partida ${index + 1}`,
    order: index + 1,
    teams: resetSeeding ? [null, null] : [slot.legs[0].homeTeam.id, slot.legs[0].awayTeam.id],
    slotId: slot.id,
  }));
}

export function newStageSeedingForm(stage?: TournamentStage): StageSeedingForm {
  return {
    groups: stage ? getTeamSeedingGroups(stage) : [],
  };
}
