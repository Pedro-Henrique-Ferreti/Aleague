export function getRandomScore(): number {
  let num = Math.floor(Math.random() * 7);

  if (num > 3 && Math.random() < 0.91) {
    num = Math.floor(Math.random() * 5);
  }

  return num;
}

function poissonSample(lambda: number): number {
  const limit = Math.exp(-lambda);
  let k = 0;
  let p = 1;
  do {
    k++;
    p *= Math.random();
  } while (p > limit);
  return k - 1;
}

export function getSimulatedMatchScore(homeStrength: TeamStrength, awayStrength: TeamStrength) {
  const BASE_GOALS = 1.3;
  const MAX_GOALS = 10;

  const homeChances = homeStrength / (homeStrength + awayStrength);
  const awayChances = awayStrength / (homeStrength + awayStrength);

  const homeExpectedGoals = BASE_GOALS * (homeChances / 0.5);
  const awayExpectedGoals = BASE_GOALS * (awayChances / 0.5);

  const home = Math.min(poissonSample(homeExpectedGoals), MAX_GOALS);
  const away = Math.min(poissonSample(awayExpectedGoals), MAX_GOALS);

  return { home, away };
}

export function resetMatchScore(match: Match) {
  match.homeTeam.score = null;
  match.awayTeam.score = null;
}
