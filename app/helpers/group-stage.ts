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

export function getGroupName(group: GroupStage['groups'][number], stage: GroupStage, tableEntryView?: TableEntryView) {
  if (stage.groups.length === 1) return 'Classificação';

  if (tableEntryView === TableEntryView.OVERALL) return 'Classificação geral';

  const { order } = group;

  if (stage.nameFormat === GroupStageNameFormat.NUMBER) return `Grupo ${order}`;

  const count = order > ALPHABET.length ? Math.ceil(order / ALPHABET.length) : '';
  const charPosition = order > ALPHABET.length ? order % ALPHABET.length : order;

  return `Grupo ${ALPHABET.at(charPosition - 1)}${count}`;
}
