import { defineStore } from 'pinia';

export interface RulesForm {
  format: GroupStageFormat;
  roundRobins: number;
  weeksToCreate: number;
}

export enum MatchweekFormStep {
  SELECT_RULES,
  PREVIEW_MATCHWEEKS,
}

export const useMatchweekFormStore = defineStore('matchweekForm', () => {
  const stageStore = useStageStore();

  const step = ref<MatchweekFormStep>(MatchweekFormStep.SELECT_RULES);

  const form = ref<RulesForm>({
    format: GroupStageFormat.SAME_GROUP_ROUND_ROBIN,
    roundRobins: StageConstants.MIN_ROUNDS,
    weeksToCreate: 1,
  });

  const matchweeks = ref<Matchweek[]>([]);

  function showPreviousStep() {
    step.value = MatchweekFormStep.SELECT_RULES;
  }

  function onFormSubmit() {
    if (step.value === MatchweekFormStep.SELECT_RULES) {
      step.value = MatchweekFormStep.PREVIEW_MATCHWEEKS;
      return;
    }

    stageStore.addGroupMatchweeks(matchweeks.value);
  }

  return {
    step,
    form,
    matchweeks,
    showPreviousStep,
    onFormSubmit,
  };
});
