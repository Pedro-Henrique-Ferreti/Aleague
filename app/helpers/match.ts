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

export function newMatch(homeTeamId: Match['homeTeam']['id'] = null, awayTeamId: Match['awayTeam']['id'] = null): Match {
  return {
    id: uuidv4(),
    homeTeam: { id: homeTeamId, score: null },
    awayTeam: { id: awayTeamId, score: null },
    kickoff: null,
  };
}

export function isMatchSeeded(match: Match): boolean {
  return match.homeTeam.id !== null && match.awayTeam.id !== null;
}

export function isMatchComplete(match: Match): boolean {
  return isMatchSeeded(match) && match.homeTeam.score !== null && match.awayTeam.score !== null;
}
