export function getPlayoffRoundNames(rounds: number, teams: number): string[] {
  let n = teams;

  for (let i = 0; i < rounds; i += 1) {
    n /= 2;
  }

  return Array.from({ length: rounds }, (_, i) => {
    const name = PLAYOFF_ROUND_NAMES[i - (rounds - PLAYOFF_ROUND_NAMES.length)]
    
    return (n !== 1 || !name) ? `Fase ${i + 1}` : name;
  });
}
