export function getKickoffDisplayText(value: MatchKickoff, formatStr = 'EEEEEE kk\'h\'mm'): string {
  return formatDate(value, formatStr).replace('sab', 'sáb');
}

export function getMatchResult(homeScore: number, awayScore: number, isHomeTeam: boolean): MatchResult {
  const goalsFor = isHomeTeam ? homeScore : awayScore;
  const goalsAgainst = isHomeTeam ? awayScore : homeScore;

  if (goalsFor > goalsAgainst) return MatchResult.WON;
  if (goalsFor < goalsAgainst) return MatchResult.LOST;

  return MatchResult.DRAW;
}
