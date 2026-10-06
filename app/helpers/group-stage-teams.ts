interface MatchweekReplacementQuery {
  search: TeamDetails['id'];
  replace: TeamDetails['id'];
}

function replaceTeamsInMatchweeks(groupStage: GroupStage, queries: MatchweekReplacementQuery[]) {
  const stage = clone(groupStage);

  for (const matchweek of stage.matchweeks) {
    for (const match of matchweek.matches) {
      const { homeTeam, awayTeam } = match;

      let homeIsUpdated = false;
      let awayIsUpdated = false;

      queries.filter(i => i.search === homeTeam.id || i.search === awayTeam.id).forEach((query) => {
        if (query.search === homeTeam.id && !homeIsUpdated) {
          homeTeam.id = query.replace;
          homeIsUpdated = true;
        }

        if (query.search === awayTeam.id && !awayIsUpdated) {
          awayTeam.id = query.replace;
          awayIsUpdated = true;
        }
      });
    }
  }

  return stage;
}

export function replaceGroupStageTeams(groupStage: GroupStage, form: StageSeedingForm) {
  let stage = clone(groupStage);
  const queries: MatchweekReplacementQuery[] = [];

  for (const group of form.groups) {
    const stageGroup = stage.groups.find(g => g.order === group.order);

    if (!stageGroup) throw new Error('Group not found');

    group.teams.forEach((team, index) => {
      const replacedTeam = stageGroup.standings[index]!.team;

      stageGroup.standings[index]!.team = team;

      if (team && replacedTeam) {
        queries.push({ search: replacedTeam, replace: team });
      }
    });
  }

  if (queries.length) {
    stage = replaceTeamsInMatchweeks(stage, queries);
  }

  return stage;
}
