import { v4 as uuidv4 } from 'uuid';
import { getPlayoffRoundNames, newPlayoffRoundSlot } from './playoffs';
import { newStandingsEntry } from './standings';

export function allTeamsAssigned(stage: TournamentStage) {
  if (stage.type === StageType.PLAYOFFS) {
    return false;
  }

  return stage.groups.every((g) => g.standings.every((s) => s.team !== null));
}

export function newPlayoffStage(stageForm: TournamentStageForm, baseStage: BaseTournamentStage): TournamentPlayoffsStage {
  const roundNames = getPlayoffRoundNames(stageForm.playoffRounds, stageForm.teams);

  const newRound = (index: number): PlayoffRound => ({
    id: uuidv4(),
    order: index,
    name: roundNames[index]!,
    slots: Array.from({ length: stageForm.teams / 2 ** (index + 1) }, (_, index) => newPlayoffRoundSlot(index)),
  });

  return {
    ...baseStage,
    type: StageType.PLAYOFFS,
    rounds: Array.from({ length: stageForm.playoffRounds }, (_, index) => newRound(index)),
  };
}

export function newGroupStage(stageForm: TournamentStageForm, baseStage: BaseTournamentStage): TournamentGroupsStage {
  const qualifier = Array.from({ length: stageForm.teamsPerGroup }, () => Qualifier.NONE);
  const standings = Array.from({ length: stageForm.teamsPerGroup }, newStandingsEntry);

  return {
    ...baseStage,
    type: StageType.GROUPS,
    format: stageForm.format,
    roundRobins: stageForm.groupRoundRobins,
    groups: Array.from({ length: stageForm.groups }, (_, index) => ({
      order: index + 1,
      qualifier,
      standings,
    })),
    overallQualifier: (
      stageForm.groups > 1
        ? Array.from({ length: stageForm.teamsPerGroup * stageForm.groups }, () => Qualifier.NONE)
        : []
    ),
    matchweeks: [],
  };
}
