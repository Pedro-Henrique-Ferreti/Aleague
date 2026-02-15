import { getPlayoffRoundNames, newPlayoffRoundSlot } from './playoffs';
import { newStandingsEntry } from './standings';

export function stageHasAllTeamsAssigned(stage: TournamentStage) {
  return stage.type === StageType.GROUPS && stage.groups.every(g => g.standings.every(s => s.team !== null));
}

export function newPlayoffStage(stageForm: TournamentStageForm, baseStage: BaseTournamentStage): TournamentPlayoffsStage {
  const roundNames = getPlayoffRoundNames(stageForm.playoffRounds, stageForm.teams);

  const newRound = (index: number): PlayoffRound => ({
    id: uuidv4(),
    order: index,
    name: roundNames[index]!,
    slots: createArray(stageForm.teams / 2 ** (index + 1), newPlayoffRoundSlot),
  });

  return {
    ...baseStage,
    type: StageType.PLAYOFFS,
    rounds: createArray(stageForm.playoffRounds, newRound),
  };
}

export function newGroupStage(stageForm: TournamentStageForm, baseStage: BaseTournamentStage): TournamentGroupsStage {
  return {
    ...baseStage,
    type: StageType.GROUPS,
    roundRobins: stageForm.groupRoundRobins,
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
