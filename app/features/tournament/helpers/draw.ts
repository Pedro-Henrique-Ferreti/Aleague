export function newDrawPot(): DrawPot {
  return {
    id: Date.now(),
    teams: [],
  };
}

export function getDrawPotName(potIndex: number): string {
  return `Pote ${potIndex + 1}`;
}
