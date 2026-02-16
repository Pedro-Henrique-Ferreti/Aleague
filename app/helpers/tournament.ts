import { newGroupStage, newPlayoffStage } from './stage';

export function newTournamentStage(form: StageForm, stageList?: TournamentStage[]): TournamentStage {
  const baseStage: BaseStage = {
    id: new Date().getTime(),
    sequence: (stageList?.[stageList.length - 1]?.sequence || 0) + 1,
    name: form.name,
    type: form.type,
  };

  return form.type === StageType.GROUP ? newGroupStage(form, baseStage) : newPlayoffStage(form, baseStage);
}
