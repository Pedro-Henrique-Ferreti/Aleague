import { createMatchListFromTeamList } from './matchweek';
import { newGroupStage, newPlayoffStage } from './stage';

export function createStage(tournament: Tournament, stageForm: TournamentStageForm) {
  const baseStage: BaseTournamentStage = {
    id: new Date().getTime(),
    sequence: (tournament.stages[tournament.stages.length - 1]?.sequence || 0) + 1,
    name: stageForm.name,
    type: stageForm.type,
  };

  return stageForm.type === StageType.GROUPS ? newGroupStage(stageForm, baseStage) : newPlayoffStage(stageForm, baseStage);
}

export function createMatchweeks(
  stage: TournamentGroupsStage,
  format: GroupsStageFormat,
  roundRobins: number,
): TournamentGroupsStage['matchweeks'] {
  let matchList: Match[][] = [];

  const teamsFromGroup = (g: TournamentGroupsStage['groups'][number]) => (
    g.standings.map(i => i.team!)
  );

  if (format === GroupsStageFormat.ROUND_ROBIN) {
    stage.groups.forEach((group) => {
      createMatchListFromTeamList(teamsFromGroup(group), roundRobins).forEach((item, i) => {
        if (!matchList[i]) {
          matchList[i] = [];
        }
        matchList[i]!.push(...item);
      });
    });
  } else if (format === GroupsStageFormat.OTHER_GROUPS_ROUND_ROBIN) {
    matchList = createMatchListFromTeamList(
      stage.groups.flatMap(g => teamsFromGroup(g)),
      roundRobins,
      stage.groups.map(g => teamsFromGroup(g)),
    );
  } else {
    matchList = createMatchListFromTeamList(stage.groups.flatMap(g => teamsFromGroup(g)), roundRobins);
  }

  return matchList.map((list, index) => ({
    week: index + 1,
    matches: list,
  }));
}
