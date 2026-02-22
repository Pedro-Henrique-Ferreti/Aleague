import { defineStore } from 'pinia';
import { getGroupTeamsAndAvoidGroups, getSameGroupTeamLists } from '~/helpers/group-stage';
import { getExpectedMatchweeksPerRoundRobin } from '~/helpers/matchweek';

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
  const matchweeks = ref<Matchweek[]>([]);
  const form = ref<RulesForm>({
    format: GroupStageFormat.SAME_GROUP_ROUND_ROBIN,
    roundRobins: StageConstants.MIN_ROUNDS,
    weeksToCreate: 1,
  });

  const maxWeeksToCreate = computed(() => {
    if (!stageStore.activeGroupStage) return 0;

    if (form.value.format === GroupStageFormat.SAME_GROUP_ROUND_ROBIN) {
      return getExpectedMatchweeksPerRoundRobin(
        getSameGroupTeamLists(stageStore.activeGroupStage.groups)[0]!.length,
      );
    }

    const { teams, avoidGroups } = getGroupTeamsAndAvoidGroups(stageStore.activeGroupStage.groups, form.value.format);

    return getExpectedMatchweeksPerRoundRobin(teams.length, avoidGroups?.[0]?.length);
  });

  watchEffect(() => {
    form.value.weeksToCreate = maxWeeksToCreate.value;
  });

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
    maxWeeksToCreate,
    showPreviousStep,
    onFormSubmit,
  };
});
