import { defineStore } from 'pinia';
import { getActiveMatchweekNumber } from '~/helpers/matchweek';

export const useMatchweekCardStore = defineStore('matchweekCard', () => {
  const stageStore = useStageStore();

  const activeMatchweekNumber = ref(getActiveMatchweekNumber(stageStore.activeGroupStage?.matchweeks ?? []));

  const selectedMatchweek = computed({
    get: () => stageStore.activeGroupStage?.matchweeks[activeMatchweekNumber.value - 1],
    set(value: Matchweek) {
      if (stageStore.activeGroupStage) {
        stageStore.activeGroupStage.matchweeks[activeMatchweekNumber.value - 1] = value;
      }
    },
  });

  watch(() => stageStore.activeGroupStage?.matchweeks.length, () => {
    activeMatchweekNumber.value = getActiveMatchweekNumber(stageStore.activeGroupStage?.matchweeks ?? []);
  });

  return {
    activeMatchweekNumber,
    selectedMatchweek,
  };
});
