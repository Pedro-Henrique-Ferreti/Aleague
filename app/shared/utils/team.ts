const TEAM_LIST_MAP = new Map<TeamDetails['id'], TeamDetails>(TEAM_LIST.map(team => [team.id, team]));

export function getTeamById(id?: TeamDetails['id'] | null) {
  return TEAM_LIST_MAP.get(id ?? '');
}
