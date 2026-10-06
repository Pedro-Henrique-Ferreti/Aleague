import { defineStore } from 'pinia';
import { isMatchComplete } from '~/helpers/match';
import { getActiveMatchweekNumber, simulateMatchweek } from '~/helpers/matchweek';

export const useMatchweekCardStore = defineStore('matchweekCard', () => {
  const stageStore = useStageStore();

  const selectedWeekNumber = ref(getActiveMatchweekNumber(stageStore.activeGroupStage?.matchweeks ?? []));
  const kickoffModalIsOpen = ref(false);
  const isSimulatingResults = ref(false);
  const isResettingMatchweeks = ref(false);
  const matchesToSimulateCount = ref({
    total: 0,
    simulated: 0,
  });

  const selectedMatchweek = computed({
    get: () => stageStore.activeGroupStage?.matchweeks[selectedWeekNumber.value - 1],
    set(value: Matchweek) {
      if (stageStore.activeGroupStage) {
        stageStore.activeGroupStage.matchweeks[selectedWeekNumber.value - 1] = value;
      }
    },
  });

  const matchweekIsDirty = computed(() => {
    return selectedMatchweek.value?.matches.some(isMatchComplete) ?? false;
  });

  watch([() => stageStore.activeGroupStage?.matchweeks.length, () => stageStore.activeGroupStage?.id], () => {
    selectedWeekNumber.value = getActiveMatchweekNumber(stageStore.activeGroupStage?.matchweeks ?? []);
  });

  function runSelectedMatchweekSimulation(preserveCompletedMatches?: boolean) {
    if (selectedMatchweek.value) {
      return simulateMatchweek(selectedMatchweek.value, {
        preserveCompletedMatches,
        onMatchSimulated: () => matchesToSimulateCount.value.simulated += 1,
      });
    }
  }

  async function simulateSelectedMatchweek(preserveCompletedMatches?: boolean) {
    isSimulatingResults.value = true;

    matchesToSimulateCount.value = {
      total: selectedMatchweek.value?.matches.length ?? 0,
      simulated: 0,
    };

    await runSelectedMatchweekSimulation(preserveCompletedMatches);

    isSimulatingResults.value = false;
  }

  async function simulateAllMatchweeks() {
    if (!stageStore.activeGroupStage) return;

    resetAllMatchweeks();

    await nextTick();

    isSimulatingResults.value = true;
    selectedWeekNumber.value = 1;
    matchesToSimulateCount.value = {
      total: stageStore.activeGroupStage.matchweeks.reduce((value, mw) => value + mw.matches.length, 0) ?? 0,
      simulated: 0,
    };

    const lastWeekNumber = [...stageStore.activeGroupStage.matchweeks].pop()?.week ?? 1;
    let remainingWeeks = stageStore.activeGroupStage?.matchweeks.length ?? 0;

    while (remainingWeeks > 0) {
      await runSelectedMatchweekSimulation();

      selectedWeekNumber.value = Math.min(selectedWeekNumber.value + 1, lastWeekNumber);
      remainingWeeks -= 1;
      await nextTick();
    }

    isSimulatingResults.value = false;
  }

  function resetAllMatchweeks() {
    isResettingMatchweeks.value = true;
    stageStore.resetGroupStageMatchesScore();
    selectedWeekNumber.value = getActiveMatchweekNumber(stageStore.activeGroupStage?.matchweeks ?? []);

    nextTick(() => {
      isResettingMatchweeks.value = false;
    });
  }

  return {
    selectedWeekNumber,
    selectedMatchweek,
    matchweekIsDirty,
    kickoffModalIsOpen,
    isSimulatingResults,
    isResettingMatchweeks,
    matchesToSimulateCount,
    simulateSelectedMatchweek,
    simulateAllMatchweeks,
    resetAllMatchweeks,
  };
});
