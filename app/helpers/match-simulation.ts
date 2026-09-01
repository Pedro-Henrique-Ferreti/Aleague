import { getRandomScore, getSimulatedMatchScore } from './match-score';
import { getTeamById } from './team';

export function simulateMatchScore(homeTeamId: Match['homeTeam']['id'], awayTeamId: Match['awayTeam']['id']) {
  const homeTeam = getTeamById(homeTeamId);
  const awayTeam = getTeamById(awayTeamId);

  if (!homeTeam?.strength || !awayTeam?.strength) {
    return {
      home: getRandomScore(),
      away: getRandomScore(),
    };
  }

  return getSimulatedMatchScore(homeTeam.strength, awayTeam.strength);
}
