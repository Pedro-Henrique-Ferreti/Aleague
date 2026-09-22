import { isMatchComplete } from './match';
import { getTableEntry, sortTableEntries } from './standings';
import { getTeamById } from './team';

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

export function isGroupStageComplete(stage: GroupStage): boolean {
  return (
    isGroupStageSeeded(stage.groups)
    && stage.matchweeks.length > 0
    && stage.matchweeks.every(week => week.matches.every(isMatchComplete))
  );
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

export function getGroupStageWinner(stage: GroupStage): TournamentWinner {
  if (stage.groups.length !== 1 || !stage.groups[0] || !isGroupStageComplete(stage)) return null;

  const [group] = stage.groups;
  const [leader] = group.standings.map(i => getTableEntry(i)).sort(sortTableEntries);

  return getTeamById(leader?.team) ?? null;
}
