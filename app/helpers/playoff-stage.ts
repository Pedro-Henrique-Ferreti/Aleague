import { isMatchSeeded } from './match';
import { getPlayoffRoundSlotWinner } from './playoff-slot';
import { getTeamById } from './team';

export function getPlayoffRoundNames(rounds: number, teams: number): string[] {
  const isFullPath = (teams / 2 ** rounds) === 1;

  return createArray(rounds, (i) => {
    const name = PLAYOFF_ROUND_NAMES[i - (rounds - PLAYOFF_ROUND_NAMES.length)];
    const ordinalName = PLAYOFF_ORDINAL_ROUND_NAMES[i] ?? `Fase ${i + 1}`;

    return (!isFullPath || !name) ? ordinalName : name;
  });
}

export function isPlayoffStageSeeded(rounds: PlayoffRound[]): boolean {
  return rounds.every(round => round.slots.every(slot => slot.legs.every(isMatchSeeded)));
}

export function getPlayoffStageWinner(stage: PlayoffStage): TournamentWinner {
  const lastRound = stage.rounds[stage.rounds.length - 1];

  if (!lastRound || lastRound.slots.length !== 1) return null;

  const winnerId = getPlayoffRoundSlotWinner(lastRound.slots[0]!);

  return getTeamById(winnerId) ?? null;
}

export function moveTeamToNextRound(
  stage: PlayoffStage,
  params: { newWinner: PlayoffRoundSlotWinner; oldWinner: PlayoffRoundSlotWinner; slotIndex: number; roundIndex: number },
) {
  const { newWinner, oldWinner, slotIndex, roundIndex } = params;

  const nextRound = stage.rounds[roundIndex + 1];

  if (!nextRound) return;

  const slot = nextRound.slots[Math.floor(slotIndex / 2)];

  if (!slot) return;

  const isFirstMatchHomeTeam = slot.legs[0].homeTeam.id === oldWinner;

  if (isFirstMatchHomeTeam) {
    slot.legs[0].homeTeam.id = newWinner;
  } else {
    slot.legs[0].awayTeam.id = newWinner;
  }

  if (slot.legs[1]) {
    if (isFirstMatchHomeTeam) {
      slot.legs[1].awayTeam.id = newWinner;
    } else {
      slot.legs[1].homeTeam.id = newWinner;
    }
  }
}
