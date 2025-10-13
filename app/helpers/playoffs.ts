export function getPlayoffRoundNames(rounds: number, teams: number): string[] {
  const isFullPath = (teams / 2 ** rounds) === 1;

  return Array.from({ length: rounds }, (_, i) => {
    const name = PLAYOFF_ROUND_NAMES[i - (rounds - PLAYOFF_ROUND_NAMES.length)]
    
    return (!isFullPath || !name) ? `Fase ${i + 1}` : name;
  });
}
