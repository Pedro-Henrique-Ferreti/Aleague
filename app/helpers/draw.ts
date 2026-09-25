export function newDrawPot(): DrawPot {
  return {
    id: new Date().getTime(),
    participants: [],
  };
}
