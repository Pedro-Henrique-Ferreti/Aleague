export function createMatchListFromTeamList(
  list: Array<TeamDetails['id']>,
  excludeGroups?: Array<TeamDetails['id'][]>,
): Array<Match[]> {
  const teamList = [...list.sort(() => Math.random() - 0.5)];

  const teams1 = teamList.slice(0, teamList.length / 2);
  const teams2 = teamList.slice(teamList.length / 2, teamList.length);
  const weeks: Array<Match[]> = [];
  let rounds = teamList.length - 1;

  while (rounds > 0) {
    const week: Match[] = [];

    for (let i = 0; i < teams1.length; i += 1) {
      const teamA = teams1[i]!;
      const teamB = teams2[i]!;

      if (excludeGroups?.some((group) => group.includes(teamA) && group.includes(teamB))) continue;

      const prevWeek = weeks[weeks.length - 1];
      const teamAPlayedAtHome = prevWeek?.find((m) => m.homeTeam.id === teamA);
      const teamBPlayedAtHome = prevWeek?.find((m) => m.homeTeam.id === teamB);

      let homeTeam = teamA;
      let awayTeam = teamB;

      if (prevWeek && teamAPlayedAtHome && !teamBPlayedAtHome) {
        homeTeam = teamB;
        awayTeam = teamA;
      }

      week.push({
        id: i,
        homeTeam: { id: homeTeam, score: null },
        awayTeam: { id: awayTeam, score: null },
      });
    }

    weeks.push(week.sort(() => Math.random() - 0.5));

    teams2.push(teams1.pop()!);

    const item = teams1.shift()!;
    
    teams1.unshift(item, teams2.shift()!);

    rounds -= 1;
  }

  // In case exclude groups generated weeks with no matches
  return weeks.filter((week) => week.length > 0);
}
