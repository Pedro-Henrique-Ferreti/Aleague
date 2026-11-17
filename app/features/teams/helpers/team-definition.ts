type TeamDefinition = Omit<TeamDetails, 'name'>;

type SharedTeamFields = Pick<TeamDetails, 'country' | 'type'>;

type TeamSpecificFields = Omit<TeamDefinition, keyof SharedTeamFields>;

export function defineTeams<K extends TeamDetails['name']>(
  { country, type }: SharedTeamFields,
  teams: Record<K, TeamSpecificFields>,
): Record<K, TeamDefinition> {
  return Object.fromEntries(
    Object.entries<TeamSpecificFields>(teams).map(([name, team]) => [name, { ...team, country, type }]),
  ) as Record<K, TeamDefinition>;
}

export function mapToTeamList(teams: ReturnType<typeof defineTeams>): ReadonlyArray<Readonly<TeamDetails>> {
  return Object.entries(teams).map(([key, value]) => ({
    name: key,
    ...value,
  }));
}

export function defineRivals(first: TeamDefinition, second: TeamDefinition, ...rest: TeamDefinition[]) {
  const teams = [first, second, ...rest];

  for (const team of teams) {
    for (const rival of teams) {
      if (team.id !== rival.id) {
        team.rivals = [...(team.rivals ?? []), rival.id];
      }
    }
  }
}
