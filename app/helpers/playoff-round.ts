import { replaceSlotTeams } from './playoff-slot';

export function getNextRound(stage: PlayoffStage, round: PlayoffRound) {
  return stage.rounds.find(r => r.order === round.order + 1);
}

export function replacePlayoffRoundTeams(round: PlayoffRound, form: StageSeedingForm) {
  for (const slot of round.slots) {
    const group = form.groups.find(g => g.slotId === slot.id);

    if (!group) return;

    const [home, away] = group.teams;

    replaceSlotTeams(slot, { home, away });
  }

}

export function moveTeamToNextRound(
  stage: PlayoffStage,
  params: { newWinner: PlayoffRoundSlotWinner; oldWinner: PlayoffRoundSlotWinner; slotIndex: number; round: PlayoffRound; },
) {
  const { newWinner, oldWinner, slotIndex, round } = params;

  const nextRound = getNextRound(stage, round);

  if (!nextRound) return;

  const slot = nextRound.slots[Math.floor(slotIndex / 2)];

  if (!slot) return;

  const isFirstMatchHomeTeam = slot.legs[0].homeTeam.id === oldWinner;

  replaceSlotTeams(slot, {
    home: isFirstMatchHomeTeam ? newWinner : undefined,
    away: isFirstMatchHomeTeam ? undefined : newWinner,
  });
}
