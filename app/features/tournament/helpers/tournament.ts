import { getGroupStageWinner, newGroupStage } from './group-stage';
import { getPlayoffStageWinner, newPlayoffStage } from './playoff-stage';

export function getTournamentStageList(stages: Tournament['stages'] = {}) {
  return Object.values(stages).sort((a, b) => a.sequence - b.sequence);
}

export function newTournament(payload: TournamentForm): Tournament {
  return {
    id: uuidv4(),
    createdAt: newTimestamp(),
    updatedAt: null,
    stages: {},
    ...payload,
  };
}

export function newTournamentStage(form: StageForm, currentStages?: Tournament['stages']): TournamentStage {
  const baseStage: BaseStage = {
    id: Date.now(),
    sequence: (getTournamentStageList(currentStages).at(-1)?.sequence ?? 0) + 1,
    name: form.name,
    type: form.type,
  };

  return form.type === StageType.GROUP ? newGroupStage(form, baseStage) : newPlayoffStage(form, baseStage);
}

export function copyTournament(tournament: Tournament): Tournament {
  return {
    ...clone(tournament),
    id: uuidv4(),
    createdAt: newTimestamp(),
    updatedAt: null,
  };
}

export function getTournamentWinner(tournament: Tournament): TournamentWinner {
  const lastStage = getTournamentStageList(tournament.stages).at(-1);

  if (!lastStage) return null;

  return lastStage.type === StageType.PLAYOFF ? getPlayoffStageWinner(lastStage) : getGroupStageWinner(lastStage);
}
