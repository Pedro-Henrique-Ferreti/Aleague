const teamListMap = new Map<TeamDetails['id'], TeamDetails>(DETAILED_TEAM_LIST.map(team => [team.id, team]));

export function getTeamById(id?: TeamDetails['id'] | null) {
  return teamListMap.get(id ?? '');
}

export function defineTeams<K extends TeamDetails['name']>(teams: Record<K, Omit<TeamDetails, 'name'>>) {
  return teams;
}

export function mapToTeamList(teams: ReturnType<typeof defineTeams>): ReadonlyArray<Readonly<TeamDetails>> {
  return Object.entries(teams).map(([key, value]) => ({
    name: key,
    ...value,
  }));
}
