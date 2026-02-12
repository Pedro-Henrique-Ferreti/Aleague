import { createMatch } from './match';
import { v4 as uuidv4 } from 'uuid';

export function getPlayoffRoundNames(rounds: number, teams: number): string[] {
  const isFullPath = (teams / 2 ** rounds) === 1;

  return Array.from({ length: rounds }, (_, i) => {
    const name = PLAYOFF_ROUND_NAMES[i - (rounds - PLAYOFF_ROUND_NAMES.length)];
    const ordinalName = PLAYOFF_ORDINAL_ROUND_NAMES[i] ?? `Fase ${i + 1}`;
    
    return (!isFullPath || !name) ? ordinalName : name;
  });
}

export function newPlayoffRoundSlot(index: number): PlayoffRoundSlot {
  return {
    id: uuidv4(),
    order: index,
    legs: [createMatch()],
  };
}
