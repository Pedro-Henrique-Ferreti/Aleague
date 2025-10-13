import { v4 as uuidv4 } from 'uuid';
import { createMatchListFromTeamList } from './matchweek';
import { getPlayoffRoundNames } from './playoffs';

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
      qualifier: Array.from({ length: stageForm.teamsPerGroup }, () => Qualifier.NONE),
      standings: Array.from({ length: stageForm.teamsPerGroup }, () => ({
        id: uuidv4(),
        team: null,
        home: { points: 0, played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0 },
        away: { points: 0, played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0 },
      })),
    })),
    overallQualifier: (
      stageForm.groups > 1
        ? Array.from({ length: stageForm.teamsPerGroup * stageForm.groups }, () => Qualifier.NONE)
        : []
    ),
    matchweeks: [],
  });

  const playoffStage = (): TournamentPlayoffsStage => ({
    ...baseStage,
    type: TournamentStageType.PLAYOFFS,
    rounds: Array.from({ length: stageForm.playoffRounds }, (_, index) => ({
      id: uuidv4(),
      order: index,
      name: getPlayoffRoundNames(stageForm.playoffRounds, stageForm.teams)[index]!,
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
