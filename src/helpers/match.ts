import { type Match, MatchOutcome } from '@/types/Match';

export function getMatchOutcome(teamId: string, match: Match): MatchOutcome {
  if (match.homeTeamScore === null || match.awayTeamScore === null) {
    return MatchOutcome.NOT_PLAYED;
  }

  if (match.homeTeamScore === match.awayTeamScore) {
    return MatchOutcome.DRAW;
  }

  const homeTeamWin = match.homeTeamScore > match.awayTeamScore;
  const isHomeTeam = match.homeTeam?.id === teamId;

  if ((homeTeamWin && isHomeTeam) || (!homeTeamWin && !isHomeTeam)) {
    return MatchOutcome.WIN;
  }

  return MatchOutcome.LOSS;
}
