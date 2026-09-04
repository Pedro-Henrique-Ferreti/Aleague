function getGroupTeams(group: GroupStageGroup) {
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

export function isGroupStageSeeded(groups: GroupStage['groups']): boolean {
  return groups.every(g => g.standings.every(s => s.team !== null));
}

export function getGroupName(order: GroupStageGroup['order'], nameFormat: GroupStage['nameFormat']) {
  if (nameFormat === GroupStageNameFormat.NUMBER) return `Grupo ${order}`;

  const count = order > ALPHABET.length ? Math.ceil(order / ALPHABET.length) : '';
  const charPosition = order > ALPHABET.length ? order % ALPHABET.length : order;

  return `Grupo ${ALPHABET.at(charPosition - 1)}${count}`;
}

export function newLegendDescription(): GroupStage['legendDescription'] {
  return Object.fromEntries(
    Object.values(LegendColor).filter(color => color !== LegendColor.NONE).map(color => [color, '']),
  ) as GroupStage['legendDescription'];
}
