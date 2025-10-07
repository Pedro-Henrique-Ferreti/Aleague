export function getStandingsDataFromScore(homeScore: number, awayScore: number, isHomeTeam: boolean) {
  const goalsFor = isHomeTeam ? homeScore : awayScore;
  const goalsAgainst = isHomeTeam ? awayScore : homeScore;
  const won = goalsFor > goalsAgainst;
  const drawn = goalsFor === goalsAgainst;

  return {
    goalsFor,
    goalsAgainst,
    won: won ? 1 : 0,
    drawn: drawn ? 1 : 0,
    lost: goalsFor < goalsAgainst ? 1 : 0,
    points: won ? POINTS_PER_WIN : drawn ? POINTS_PER_DRAW : POINTS_PER_LOSE,
  };
}
