import { createMatchListFromTeamList } from './matchweek';

export function getTournamentIcon(id: Tournament['iconId']) {
  return `/images/icons/tournament/icon-${id}.svg`;
}

export function createStage(tournament: Tournament, stageForm: TournamentStageForm) {
  const baseStage: BaseTournamentStage = {
    id: new Date().getTime(),
    sequence: (tournament.stages[tournament.stages.length - 1]?.sequence || 0) + 1,
    name: stageForm.name,
    type: stageForm.type,
  };

  const groupStage = (): TournamentGroupsStage => ({
    ...baseStage,
    type: TournamentStageType.GROUPS,
    format: stageForm.format,
    roundRobins: stageForm.groupRoundRobins,
    groups: Array.from({ length: stageForm.groups }, (_, index) => ({
      order: index + 1,
      qualification: Array.from({ length: stageForm.teamsPerGroup }, () => Qualification.NONE),
      standings: Array.from({ length: stageForm.teamsPerGroup }, (_, index) => ({
        id: index,
        position: index + 1,
        points: 0,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        team: null,
      })),
    })),
    matchweeks: [],
  });

  const playoffStage = (): TournamentPlayoffsStage => ({
    ...baseStage,
    type: TournamentStageType.PLAYOFFS,
    rounds: [],
  });

  return stageForm.type === TournamentStageType.GROUPS ? groupStage() : playoffStage();
}

export function createMatchweeks(stage: TournamentGroupsStage): TournamentGroupsStage['matchweeks'] {
  let matchList: Match[][] = [];

  const teamsFromGroup = (g: TournamentGroupsStage['groups'][number]) => (
    g.standings.map((i) => i.team!)
  );

  if (stage.format === TournamentGroupFormat.ROUND_ROBIN) {
    stage.groups.forEach((group) => {
      createMatchListFromTeamList(teamsFromGroup(group), stage.roundRobins).forEach((item, i) => {
        if (!matchList[i]) {
          matchList[i] = [];
        }
        matchList[i]!.push(...item);
      });
  });
  } else if (stage.format === TournamentGroupFormat.OTHER_GROUPS_ROUND_ROBIN) {
    matchList = createMatchListFromTeamList(
      stage.groups.flatMap((g) => teamsFromGroup(g)),
      stage.roundRobins,
      stage.groups.map((g) => teamsFromGroup(g)),
    );
  } else {
    matchList = createMatchListFromTeamList(stage.groups.flatMap((g) => teamsFromGroup(g)), stage.roundRobins);
  }

  return matchList.map((list, index) => ({
    week: index + 1,
    matches: list,
  }));
}
