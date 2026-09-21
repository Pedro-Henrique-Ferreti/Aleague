import { getBaseFileId, getTimestamp } from './file';
import { getGroupStageWinner } from './group-stage';
import { getPlayoffStageWinner } from './playoff-stage';
import { newGroupStage, newPlayoffStage } from './stage';

export function newTournament(payload: TournamentForm): Tournament {
  const id = getBaseFileId();
  const timestamp = getTimestamp();

  return {
    ...payload,
    id,
    createdAt: timestamp,
    updatedAt: timestamp,
    stages: [],
  };
}

export function newTournamentStage(form: StageForm, stageList?: TournamentStage[]): TournamentStage {
  const baseStage: BaseStage = {
    id: new Date().getTime(),
    sequence: (stageList?.[stageList.length - 1]?.sequence || 0) + 1,
    name: form.name,
    type: form.type,
  };

  return form.type === StageType.GROUP ? newGroupStage(form, baseStage) : newPlayoffStage(form, baseStage);
}

export function getTournamentWinner(tournament: Tournament): TeamDetails | null {
  const lastStage = tournament.stages[tournament.stages.length - 1];

  if (!lastStage) return null;

  return lastStage.type === StageType.PLAYOFF ? getPlayoffStageWinner(lastStage) : getGroupStageWinner(lastStage);
}
