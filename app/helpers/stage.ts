import { newLegendDescription } from './group-stage';
import { newPlayoffRoundSlot } from './playoff-slot';
import { getPlayoffRoundNames } from './playoff-stage';
import { newStandingsEntry } from './standings';

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
    nameFormat: stageForm.groupNameFormat,
    matchweeks: [],
    groups: createArray(stageForm.groups, index => ({
      order: index + 1,
      legend: createArray(stageForm.teamsPerGroup, LegendColor.NONE),
      standings: createArray(stageForm.teamsPerGroup, () => newStandingsEntry()),
    })),
    legendDescription: newLegendDescription(),
    overallLegend: (
      (stageForm.groups > 1) ? createArray(stageForm.teamsPerGroup * stageForm.groups, LegendColor.NONE) : []
    ),
  };
}
