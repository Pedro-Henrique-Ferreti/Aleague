const DETAILED_TEAM_LIST_MAP = new Map<TeamDetails['id'], TeamDetails>(DETAILED_TEAM_LIST.map(team => [team.id, team]));

export function getTeamById(id?: TeamDetails['id'] | null) {
  return DETAILED_TEAM_LIST_MAP.get(id ?? '');
}
