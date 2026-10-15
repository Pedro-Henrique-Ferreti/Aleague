type DefineTeamsValue = Omit<TeamDetails, 'name'>;

const teamListMap = new Map<TeamDetails['id'], TeamDetails>(DETAILED_TEAM_LIST.map(team => [team.id, team]));

export function getTeamById(id?: TeamDetails['id'] | null) {
  return teamListMap.get(id ?? '');
}

export function defineTeams<K extends TeamDetails['name']>(teams: Record<K, DefineTeamsValue>) {
  return teams;
}

export function mapToTeamList(teams: ReturnType<typeof defineTeams>): ReadonlyArray<Readonly<TeamDetails>> {
  return Object.entries(teams).map(([key, value]) => ({
    name: key,
    ...value,
  }));
}

export function defineRivals(first: DefineTeamsValue, second: DefineTeamsValue, ...rest: DefineTeamsValue[]) {
  const teams = [first, second, ...rest];

  for (const team of teams) {
    for (const rival of teams) {
      if (team.id !== rival.id) {
        team.rivals = [...(team.rivals ?? []), rival.id];
      }
    }
  }
}
