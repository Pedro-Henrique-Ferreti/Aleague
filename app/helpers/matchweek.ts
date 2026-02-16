import { newMatch } from './match';

export function createMatchListFromTeamList(
  list: TeamDetails['id'][],
  roundRobins = 1,
  avoidGroups?: TeamDetails['id'][][],
): MatchList {
  const teamList = randomizeArray(list);
  const teams1 = teamList.slice(0, teamList.length / 2);
  const teams2 = teamList.slice(teamList.length / 2, teamList.length);
  const weeks: MatchList = [];

  let rounds = teamList.length - 1;

  while (rounds > 0) {
    const week: Match[] = [];

    for (let i = 0; i < teams1.length; i += 1) {
      const teamA = teams1[i]!;
      const teamB = teams2[i]!;

      const teamsInSameAvoidGroup = avoidGroups?.some(group => group.includes(teamA) && group.includes(teamB));

      if (teamsInSameAvoidGroup) continue;

      const prevWeek = weeks[weeks.length - 1];
      const teamAPlayedAtHome = prevWeek?.find(m => m.homeTeam.id === teamA);
      const teamBPlayedAtHome = prevWeek?.find(m => m.homeTeam.id === teamB);

      let homeTeam = teamA;
      let awayTeam = teamB;

      if (prevWeek && teamAPlayedAtHome && !teamBPlayedAtHome) {
        homeTeam = teamB;
        awayTeam = teamA;
      }

      week.push(newMatch(homeTeam, awayTeam));
    }

    weeks.push(randomizeArray(week));

    teams2.push(teams1.pop()!);

    const item = teams1.shift()!;

    teams1.unshift(item, teams2.shift()!);

    rounds -= 1;
  }

  const robinLength = weeks.length;

  let completedRobins = 1;

  while (completedRobins < roundRobins) {
    weeks.push(
      ...weeks.slice(-1 * robinLength).map(week => (
        week.map(match => newMatch(match.awayTeam.id, match.homeTeam.id))
      )),
    );

    completedRobins += 1;
  }

  // In case exclude groups generated weeks with no matches
  return weeks.filter(week => week.length > 0);
}
