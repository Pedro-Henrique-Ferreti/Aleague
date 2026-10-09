export function newDrawPot(): DrawPot {
  return {
    id: new Date().getTime(),
    teams: [],
  };
}

export function getDrawPotName(potIndex: number): string {
  return `Pote ${potIndex + 1}`;
}
