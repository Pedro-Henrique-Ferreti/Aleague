import { v4 as uuidv4 } from 'uuid';
import { createMatchListFromTeamList } from './matchweek';
import { getPlayoffRoundNames } from './playoffs';
import { newStandingsEntry } from './standings';

export function createStage(tournament: Tournament, stageForm: TournamentStageForm) {
  const baseStage: BaseTournamentStage = {
    id: new Date().getTime(),
    sequence: (tournament.stages[tournament.stages.length - 1]?.sequence || 0) + 1,
    name: stageForm.name,
    type: stageForm.type,
  };

  const groupStage = (): TournamentGroupsStage => ({
    ...baseStage,
    type: StageType.GROUPS,
    format: stageForm.format,
    roundRobins: stageForm.groupRoundRobins,
    groups: Array.from({ length: stageForm.groups }, (_, index) => ({
      order: index + 1,
      qualifier: Array.from({ length: stageForm.teamsPerGroup }, () => Qualifier.NONE),
      standings: Array.from({ length: stageForm.teamsPerGroup }, () => newStandingsEntry()),
    })),
    overallQualifier: (
      stageForm.groups > 1
        ? Array.from({ length: stageForm.teamsPerGroup * stageForm.groups }, () => Qualifier.NONE)
        : []
    ),
    matchweeks: [],
  });

  const playoffStage = (): TournamentPlayoffsStage => {
    const roundNames = getPlayoffRoundNames(stageForm.playoffRounds, stageForm.teams);
    return {
      ...baseStage,
      type: StageType.PLAYOFFS,
      rounds: Array.from({ length: stageForm.playoffRounds }, (_, index) => ({
        id: uuidv4(),
        order: index,
        name: roundNames[index]!,
        slots: Array.from({ length: stageForm.teams / 2 ** (index + 1) }, (_, order) => ({
          id: uuidv4(),
          order,
          legs: [{
            id: uuidv4(),
            homeTeam: { id: null, score: null },
            awayTeam: { id: null, score: null },
            kickoff: null,
          } as PlayoffRoundSlot['legs'][number]],
        })),
      })),
    }
  };

  return stageForm.type === StageType.GROUPS ? groupStage() : playoffStage();
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
