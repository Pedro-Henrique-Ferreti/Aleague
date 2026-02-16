import { createMatchListFromTeamList } from './matchweek';
import { groupsAreFullyCompleted, newGroupStage, newPlayoffStage } from './stage';

export function newTournamentStage(form: StageForm, stageList?: TournamentStage[]): TournamentStage {
  const baseStage: BaseStage = {
    id: new Date().getTime(),
    sequence: (stageList?.[stageList.length - 1]?.sequence || 0) + 1,
    name: form.name,
    type: form.type,
  };

  return form.type === StageType.GROUP ? newGroupStage(form, baseStage) : newPlayoffStage(form, baseStage);
}

export function createMatchweeks(
  groups: GroupStage['groups'],
  format: GroupStageFormat,
  roundRobins: number,
): GroupStage['matchweeks'] {
  if (!groupsAreFullyCompleted(groups)) throw new Error('All teams must be assigned');

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
