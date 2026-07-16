import { newMatch } from './match';

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
  return rounds.every(round => round.slots.every(slot => slot.legs.every(leg => leg.homeTeam.id !== null && leg.awayTeam.id !== null)));
}
