import { defineStore } from 'pinia';
import { getRandomScore } from '~/helpers/match';
import { getActiveMatchweekNumber } from '~/helpers/matchweek';

export const useMatchweekCardStore = defineStore('matchweekCard', () => {
  const stageStore = useStageStore();

  const selectedWeekNumber = ref(getActiveMatchweekNumber(stageStore.activeGroupStage?.matchweeks ?? []));
  const kickoffModalIsOpen = ref(false);
  const isSimulatingResults = ref(false);

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

        setTimeout(resolve);
      });
    }
  }

  async function simulateMatchweek() {
    isSimulatingResults.value = true;

    await simulateSelectedMatchweek();

    isSimulatingResults.value = false;
  }

  return {
    selectedWeekNumber,
    selectedMatchweek,
    kickoffModalIsOpen,
    isSimulatingResults,
    simulateMatchweek,
  };
});
