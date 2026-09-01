export function getRandomScore(): number {
  let num = Math.floor(Math.random() * 7);

  if (num > 3 && Math.random() < 0.91) {
    num = Math.floor(Math.random() * 5);
  }

  return num;
}

export function getSimulatedMatchScore(homeStrength: TeamStrength, awayStrength: TeamStrength) {
  return {
    home: Math.floor(homeStrength),
    away: Math.floor(awayStrength),
  };
}
