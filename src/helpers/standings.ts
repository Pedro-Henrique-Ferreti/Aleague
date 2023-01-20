import type { LeagueStanding } from '@/types/League';

export const sortStandings = (a: LeagueStanding, b: LeagueStanding) => {
  if (a.gamesPlayed === 0 && b.gamesPlayed === 0) {
    return (a.teamName < b.teamName) ? -1 : 1;
  }

  if (b.points - a.points !== 0) {
    return b.points - a.points;
  }

  if (b.gamesWon - a.gamesWon !== 0) {
    return b.gamesWon - a.gamesWon;
  }

  if (b.goalDifference - a.goalDifference !== 0) {
    return b.goalDifference - a.goalDifference;
  }

  if (b.goalsFor - a.goalsFor !== 0) {
    return b.goalsFor - a.goalsFor;
  }

  if (a.goalsAgainst - b.goalsAgainst !== 0) {
    return a.goalsAgainst - b.goalsAgainst;
  }

  return 0;
};
