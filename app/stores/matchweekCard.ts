import { defineStore } from 'pinia';
import { getActiveMatchweekNumber } from '~/helpers/matchweek';

export const useMatchweekCardStore = defineStore('matchweekCard', () => {
  const stageStore = useStageStore();

  const selectedWeekNumber = ref(getActiveMatchweekNumber(stageStore.activeGroupStage?.matchweeks ?? []));
  const kickoffModalIsOpen = ref(false);

  const selectedMatchweek = computed({
    get: () => stageStore.activeGroupStage?.matchweeks[selectedWeekNumber.value - 1],
    set(value: Matchweek) {
      if (stageStore.activeGroupStage) {
        stageStore.activeGroupStage.matchweeks[selectedWeekNumber.value - 1] = value;
      }
    },
  });

  watch(() => stageStore.activeGroupStage?.matchweeks.length, () => {
    selectedWeekNumber.value = getActiveMatchweekNumber(stageStore.activeGroupStage?.matchweeks ?? []);
  });

  return {
    selectedWeekNumber,
    selectedMatchweek,
    kickoffModalIsOpen,
  };
});
