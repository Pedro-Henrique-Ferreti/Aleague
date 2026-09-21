import { isMatchComplete, isMatchSeeded, newMatch } from './match';

export function getPlayoffRoundNames(rounds: number, teams: number): string[] {
  const isFullPath = (teams / 2 ** rounds) === 1;

  return createArray(rounds, (i) => {
    const name = PLAYOFF_ROUND_NAMES[i - (rounds - PLAYOFF_ROUND_NAMES.length)];
    const ordinalName = PLAYOFF_ORDINAL_ROUND_NAMES[i] ?? `Fase ${i + 1}`;

    return (!isFullPath || !name) ? ordinalName : name;
  });
}

export function newPlayoffRoundSlot(index: number): PlayoffRoundSlot {
  return {
    id: uuidv4(),
    order: index,
    legs: [newMatch()],
  };
}

export function isPlayoffStageSeeded(rounds: PlayoffRound[]): boolean {
  return rounds.every(round => round.slots.every(slot => slot.legs.every(isMatchSeeded)));
}

export function getPlayoffRoundSlotWinner(slot: PlayoffRoundSlot): PlayoffRoundSlotWinner {
  if (slot.legs.some(match => !isMatchComplete(match))) return null;

  const [firstLeg, secondLeg] = slot.legs;

  const homeScore = firstLeg.homeTeam.score! + (secondLeg?.awayTeam.score ?? 0);
  const awayScore = firstLeg.awayTeam.score! + (secondLeg?.homeTeam.score ?? 0);

  if (homeScore > awayScore) return slot.legs[0].homeTeam.id;
  if (homeScore < awayScore) return slot.legs[0].awayTeam.id;
  return null;
}
