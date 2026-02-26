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
  const matchweekListController = ref<AbortController>();
  const matchweekList = ref<NewMatchweekListResponse>();
  const isCreatingMatchweeks = ref(false);
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

  async function getNewMatchweeks() {
    isCreatingMatchweeks.value = true;
    matchweekListController.value = new AbortController();

    newGroupStageMatchweekList({
      groups: stageStore.activeGroupStage?.groups ?? [],
      format: form.value.format,
      roundRobins: form.value.roundRobins,
      weeksToCreate: form.value.weeksToCreate,
      signal: matchweekListController.value?.signal,
    }).then((result) => {
      matchweekList.value = result;
      isCreatingMatchweeks.value = false;
    }).catch(() => {});
  }

  function showFormStep(newStep: MatchweekFormStep) {
    if (newStep === MatchweekFormStep.SELECT_RULES) {
      matchweekListController.value?.abort();
      matchweekList.value = undefined;
      isCreatingMatchweeks.value = false;
    } else if (newStep === MatchweekFormStep.PREVIEW_MATCHWEEKS) {
      getNewMatchweeks();
    }

    step.value = newStep;
  }

  function onFormOpen() {
    form.value = newForm();
    showFormStep(MatchweekFormStep.SELECT_RULES);
  }

  function onFormClose() {
    matchweekListController.value?.abort();
  }

  function onFormSubmit() {
    if (step.value === MatchweekFormStep.SELECT_RULES) {
      showFormStep(MatchweekFormStep.PREVIEW_MATCHWEEKS);
      return;
    }

    if (matchweekList.value) {
      stageStore.addGroupMatchweeks(matchweekList.value.matchweeks);
    }
  }

  return {
    step,
    form,
    isCreatingMatchweeks,
    matchweekList,
    maxWeeksToCreate,
    showFormStep,
    onFormOpen,
    onFormClose,
    onFormSubmit,
    getNewMatchweeks,
  };
});
