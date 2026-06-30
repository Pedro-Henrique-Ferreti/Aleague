const teamListMap = new Map<TeamDetails['id'], TeamDetails>(DETAILED_TEAM_LIST.map(team => [team.id, team]));

export function getTeamById(id?: TeamDetails['id'] | null) {
  return teamListMap.get(id ?? '');
}
