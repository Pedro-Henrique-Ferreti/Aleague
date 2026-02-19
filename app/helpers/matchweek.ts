export function getExpectedMatchesPerWeek(teamsCount: number): number {
  if (teamsCount < 2 || teamsCount % 2 !== 0) {
    return 0;
  }
  // Teams should play once per week, so matches per week is always half the number of teams
  return teamsCount / 2;
}

export function getMaxPossibleMatchweeksPerRoundRobin(teamsCount: number): number {
  // A team can't play against itself, so the number of matchweeks is always one less
  return teamsCount - 1;
}

export function getExpectedMatchweeksPerRoundRobin(teamsCount: number, avoidGroupMembersCount = 0): number {
  // A team is assumed to be in the avoidGroup, so avoidGroupMembersCount is subtracted by one
  return getMaxPossibleMatchweeksPerRoundRobin(teamsCount) - Math.max(0, avoidGroupMembersCount - 1);
}
