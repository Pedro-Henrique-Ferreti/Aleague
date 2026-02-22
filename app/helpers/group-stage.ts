function getGroupTeams(group: GroupStage['groups'][number]) {
  return group.standings.map(i => i.team!);
}

export function getSameGroupTeamLists(groups: GroupStage['groups']) {
  return groups.map(getGroupTeams);
}

export function getGroupTeamsAndAvoidGroups(groups: GroupStage['groups'], format: GroupStageFormat) {
  return {
    teams: groups.flatMap(getGroupTeams),
    avoidGroups: (
      format === GroupStageFormat.OTHER_GROUPS_ROUND_ROBIN ? groups.map(getGroupTeams) : undefined
    ),
  };
}

export function groupsAreFullyCompleted(groups: GroupStage['groups']): boolean {
  return groups.every(g => g.standings.every(s => s.team !== null));
}
