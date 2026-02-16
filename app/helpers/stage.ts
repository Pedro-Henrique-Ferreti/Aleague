import { createMatchListFromTeamList } from './matchweek';
import { getPlayoffRoundNames, newPlayoffRoundSlot } from './playoff';
import { newStandingsEntry } from './standings';

export function groupsAreFullyCompleted(groups: GroupStage['groups']): boolean {
  return groups.every(g => g.standings.every(s => s.team !== null));
}

export function newPlayoffStage(stageForm: StageForm, baseStage: BaseStage): PlayoffStage {
  const roundNames = getPlayoffRoundNames(stageForm.playoffRounds, stageForm.teams);

  const newRound = (index: number): PlayoffRound => ({
    id: uuidv4(),
    order: index,
    name: roundNames[index]!,
    slots: createArray(stageForm.teams / 2 ** (index + 1), newPlayoffRoundSlot),
  });

  return {
    ...baseStage,
    type: StageType.PLAYOFF,
    rounds: createArray(stageForm.playoffRounds, newRound),
  };
}

export function newGroupStage(stageForm: StageForm, baseStage: BaseStage): GroupStage {
  return {
    ...baseStage,
    type: StageType.GROUP,
    matchweeks: [],
    groups: createArray(stageForm.groups, index => ({
      order: index + 1,
      qualifier: createArray(stageForm.teamsPerGroup, () => Qualifier.NONE),
      standings: createArray(stageForm.teamsPerGroup, () => newStandingsEntry()),
    })),
    overallQualifier: (
      (stageForm.groups > 1) ? createArray(stageForm.teamsPerGroup * stageForm.groups, () => Qualifier.NONE) : []
    ),
  };
}

export function newGroupStageMatchweekList(
  groups: GroupStage['groups'],
  format: GroupStageFormat,
  roundRobins: number,
): GroupStage['matchweeks'] {
  if (!groupsAreFullyCompleted(groups)) throw new Error('All teams must be assigned');

  let matchList: MatchList = [];

  const getGroupTeams = (group: GroupStage['groups'][number]) => (group.standings.map(i => i.team!));

  if (format === GroupStageFormat.SAME_GROUP_ROUND_ROBIN) {
    for (const group of groups) {
      createMatchListFromTeamList(getGroupTeams(group), roundRobins).forEach((item, i) => {
        if (!matchList[i]) {
          matchList[i] = [];
        }
        matchList[i]!.push(...item);
      });
    }
  } else if (format === GroupStageFormat.OTHER_GROUPS_ROUND_ROBIN) {
    matchList = createMatchListFromTeamList(
      groups.flatMap(getGroupTeams),
      roundRobins,
      groups.map(getGroupTeams),
    );
  } else {
    matchList = createMatchListFromTeamList(groups.flatMap(getGroupTeams), roundRobins);
  }

  return matchList.map((list, index) => ({
    week: index + 1,
    matches: list,
  }));
}
