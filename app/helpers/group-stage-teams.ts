type MatchweekReplacementQueries = Map<TeamDetails['id'], TeamDetails['id']>;

function replaceTeamsInMatchweeks(stage: GroupStage, queries: MatchweekReplacementQueries) {
  if (queries.size === 0) return;

  const updatedMatches = new Map<Match['id'], Match>();
  const homeUpdatedMatches: Match['id'][] = [];
  const awayUpdatedMatches: Match['id'][] = [];

  for (const [search, replace] of queries.entries()) {
    for (const match of stage.matchweeks.flatMap(i => i.matches)) {
      if (match.homeTeam.id !== search && match.awayTeam.id !== search) continue;

      if (match.homeTeam.id === search && !homeUpdatedMatches.includes(match.id)) {
        match.homeTeam.id = replace;
        homeUpdatedMatches.push(match.id);
      }

      if (match.awayTeam.id === search && !awayUpdatedMatches.includes(match.id)) {
        match.awayTeam.id = replace;
        awayUpdatedMatches.push(match.id);
      }

      updatedMatches.set(match.id, match);
    }
  }

  for (const form of stage.groups
    .flatMap(group => group.standings)
    .flatMap(standings => standings.data)
    .flatMap(data => data.form)) {
    if (updatedMatches.has(form.match.id)) {
      form.match = updatedMatches.get(form.match.id)!;
    }
  }
}

export function replaceGroupStageTeams(stage: GroupStage, form: StageSeedingForm) {
  const queries: MatchweekReplacementQueries = new Map();

  for (const teamSeedingGroup of form.groups) {
    const stageGroup = stage.groups.find(g => g.order === teamSeedingGroup.order);

    if (!stageGroup) continue;

    teamSeedingGroup.teams.forEach((team, index) => {
      const { team: replacedTeam } = stageGroup.standings[index]!;

      stageGroup.standings[index]!.team = team;

      if (team && replacedTeam && team !== replacedTeam) {
        queries.set(replacedTeam, team);
      }
    });
  }

  replaceTeamsInMatchweeks(stage, queries);
}
