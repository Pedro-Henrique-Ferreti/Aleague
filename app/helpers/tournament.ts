import { createMatchListFromTeamList } from './matchweek';
import { newGroupStage, newPlayoffStage } from './stage';

export function createStage(tournament: Tournament, stageForm: StageForm) {
  const baseStage: BaseStage = {
    id: new Date().getTime(),
    sequence: (tournament.stages[tournament.stages.length - 1]?.sequence || 0) + 1,
    name: stageForm.name,
    type: stageForm.type,
  };

  return stageForm.type === StageType.GROUP ? newGroupStage(stageForm, baseStage) : newPlayoffStage(stageForm, baseStage);
}

export function createMatchweeks(
  groups: GroupStage['groups'],
  format: GroupStageFormat,
  roundRobins: number,
): GroupStage['matchweeks'] {
  let matchList: Match[][] = [];

  const teamsFromGroup = (g: GroupStage['groups'][number]) => (
    g.standings.map(i => i.team!)
  );

  if (format === GroupStageFormat.SAME_GROUP_ROUND_ROBIN) {
    groups.forEach((group) => {
      createMatchListFromTeamList(teamsFromGroup(group), roundRobins).forEach((item, i) => {
        if (!matchList[i]) {
          matchList[i] = [];
        }
        matchList[i]!.push(...item);
      });
    });
  } else if (format === GroupStageFormat.OTHER_GROUPS_ROUND_ROBIN) {
    matchList = createMatchListFromTeamList(
      groups.flatMap(g => teamsFromGroup(g)),
      roundRobins,
      groups.map(g => teamsFromGroup(g)),
    );
  } else {
    matchList = createMatchListFromTeamList(groups.flatMap(g => teamsFromGroup(g)), roundRobins);
  }

  return matchList.map((list, index) => ({
    week: index + 1,
    matches: list,
  }));
}
