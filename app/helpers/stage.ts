import { getPlayoffRoundNames, newPlayoffRoundSlot } from './playoff';
import { newStandingsEntry } from './standings';

export function stageHasAllTeamsAssigned(stage: TournamentStage) {
  return stage.type === StageType.GROUP && stage.groups.every(g => g.standings.every(s => s.team !== null));
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
