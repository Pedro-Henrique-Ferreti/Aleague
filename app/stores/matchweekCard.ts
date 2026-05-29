import { defineStore } from 'pinia';
import { getRandomScore } from '~/helpers/match';
import { getActiveMatchweekNumber } from '~/helpers/matchweek';

export const useMatchweekCardStore = defineStore('matchweekCard', () => {
  const stageStore = useStageStore();

  const selectedWeekNumber = ref(getActiveMatchweekNumber(stageStore.activeGroupStage?.matchweeks ?? []));
  const kickoffModalIsOpen = ref(false);
  const isSimulatingResults = ref(false);
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

  watch(() => stageStore.activeGroupStage?.matchweeks.length, () => {
    selectedWeekNumber.value = getActiveMatchweekNumber(stageStore.activeGroupStage?.matchweeks ?? []);
  });

  async function simulateSelectedMatchweek() {
    if (!selectedMatchweek.value) return;

    for (const match of selectedMatchweek.value.matches) {
      await new Promise((resolve) => {
        match.homeTeam.score = getRandomScore();
        match.awayTeam.score = getRandomScore();
        matchesToSimulateCount.value.simulated += 1;

        setTimeout(resolve);
      });
    }
  }

  async function simulateMatchweek() {
    isSimulatingResults.value = true;

    matchesToSimulateCount.value = {
      total: selectedMatchweek.value?.matches.length ?? 0,
      simulated: 0,
    };

    await simulateSelectedMatchweek();

    isSimulatingResults.value = false;
  }

  async function simulateAllMatchweeks() {
    if (!stageStore.activeGroupStage) return;

    isSimulatingResults.value = true;
    selectedWeekNumber.value = 1;
    matchesToSimulateCount.value = {
      total: stageStore.activeGroupStage.matchweeks.reduce((value, mw) => value + mw.matches.length, 0) ?? 0,
      simulated: 0,
    };

    const lastWeekNumber = [...stageStore.activeGroupStage.matchweeks].pop()?.week ?? 1;
    let remainingWeeks = stageStore.activeGroupStage?.matchweeks.length ?? 0;

    while (remainingWeeks > 0) {
      await simulateSelectedMatchweek();
      selectedWeekNumber.value = Math.min(selectedWeekNumber.value + 1, lastWeekNumber);
      remainingWeeks -= 1;
      await nextTick();
    }

    isSimulatingResults.value = false;
  }

  function resetAllMatchweeks() {
    stageStore.resetGroupMatchweeks();
    selectedWeekNumber.value = getActiveMatchweekNumber(stageStore.activeGroupStage?.matchweeks ?? []);
  }

  return {
    selectedWeekNumber,
    selectedMatchweek,
    kickoffModalIsOpen,
    isSimulatingResults,
    matchesToSimulateCount,
    simulateMatchweek,
    simulateAllMatchweeks,
    resetAllMatchweeks,
  };
});
