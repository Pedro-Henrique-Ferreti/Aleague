import { v4 as uuidv4 } from 'uuid';

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

export function getRandomScore() {
  let num = Math.floor(Math.random() * 7);

  if (num > 3 && Math.random() < 0.91) {
    num = Math.floor(Math.random() * 5);
  }

  return num;
}

export const createMatch = (
  homeTeamId: Match['homeTeam']['id'] = null,
  awayTeamId: Match['awayTeam']['id'] = null,
): Match => ({
  id: uuidv4(),
  homeTeam: { id: homeTeamId, score: null },
  awayTeam: { id: awayTeamId, score: null },
  kickoff: null,
});
