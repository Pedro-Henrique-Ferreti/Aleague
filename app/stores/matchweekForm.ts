import { defineStore } from 'pinia';
import { getGroupTeamsAndAvoidGroups, getSameGroupTeamLists } from '~/helpers/group-stage';
import { getExpectedMatchweeksPerRoundRobin } from '~/helpers/matchweek';
import { newGroupStageMatchweekList, type NewMatchweekListResponse } from '~/helpers/stage';

interface RulesForm {
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

  const newForm = (): RulesForm => ({
    format: GroupStageFormat.SAME_GROUP_ROUND_ROBIN,
    roundRobins: STAGE_FORM.MIN_ROUNDS,
    weeksToCreate: 1,
  });

  const step = ref<MatchweekFormStep>(MatchweekFormStep.SELECT_RULES);
  const matchweekList = ref<NewMatchweekListResponse>();
  const form = ref(newForm());

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

  async function getNewMatchweeks() {
    matchweekList.value = await newGroupStageMatchweekList({
      groups: stageStore.activeGroupStage?.groups ?? [],
      format: form.value.format,
      roundRobins: form.value.roundRobins,
      weeksToCreate: form.value.weeksToCreate,
    });
  }

  function onFormOpen() {
    form.value = newForm();
    matchweekList.value = undefined;
    step.value = MatchweekFormStep.SELECT_RULES;
  }

  function onFormSubmit() {
    if (step.value === MatchweekFormStep.SELECT_RULES) {
      getNewMatchweeks();
      step.value = MatchweekFormStep.PREVIEW_MATCHWEEKS;
      return;
    }

    if (matchweekList.value) {
      stageStore.addGroupMatchweeks(matchweekList.value.matchweeks);
    }
  }

  return {
    step,
    form,
    matchweekList,
    maxWeeksToCreate,
    showPreviousStep,
    onFormOpen,
    onFormSubmit,
    getNewMatchweeks,
  };
});
