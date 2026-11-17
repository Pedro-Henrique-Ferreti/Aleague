import { isMatchSeeded } from './match';
import { replaceSlotTeams } from './playoff-slot';

export function isPlayoffRoundSeeded(round: PlayoffRound) {
  return round.slots.every(slot => slot.legs.every(isMatchSeeded));
}

export function isNextRound(roundA: PlayoffRound, roundB: PlayoffRound) {
  return roundA.order - 1 === roundB.order;
}

export function getNextRound(stage: PlayoffStage, round: PlayoffRound) {
  return stage.rounds.find(r => r.order === round.order + 1);
}

export function reorderPlayoffRoundSlots(roundToUpdate: PlayoffRound, roundToCompare: PlayoffRound) {
  if (!isNextRound(roundToCompare, roundToUpdate)
    || !isPlayoffRoundSeeded(roundToUpdate)
    || !isPlayoffRoundSeeded(roundToCompare)) {
    return;
  }

  const reorderedSlots: PlayoffRound['slots'] = [];

  for (const { legs: [match] } of roundToCompare.slots) {
    for (const team of [match.homeTeam.id, match.awayTeam.id]) {
      const slotToReorder = roundToUpdate?.slots.find((slot) => {
        return [slot.legs[0].homeTeam.id, slot.legs[0].awayTeam.id].includes(team);
      });

      if (slotToReorder) {
        reorderedSlots.push({
          ...slotToReorder,
          order: reorderedSlots.length + 1,
        });
      }
    }
  }

  roundToUpdate.slots = reorderedSlots;
}

export async function replacePlayoffRoundTeams(round: PlayoffRound, form: StageSeedingForm, stage?: PlayoffStage) {
  for (const slot of round.slots) {
    const group = form.groups.find(g => g.slotId === slot.id);

    if (!group) return;

    const [home, away] = group.teams;

    replaceSlotTeams(slot, { home, away });
  }

  if (!stage) return;

  const previousRounds = stage.rounds.filter(r => r.order < round.order);

  if (previousRounds.length === 0) return;

  for (const previousRound of previousRounds.sort((a, b) => b.order - a.order)) {
    const nextRound = getNextRound(stage, previousRound);

    if (nextRound) {
      reorderPlayoffRoundSlots(previousRound, nextRound);
    }
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
