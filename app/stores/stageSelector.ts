import { defineStore } from 'pinia';

interface SelectionOption {
  id: GroupStage['id'] | PlayoffRound['id'];
  name: GroupStage['name'] | PlayoffRound['name'];
}

export const useStageSelectorStore = defineStore('stage-selector', () => {
  const tournamentStore = useTournamentStore();

  const selectedStageOrPlayoffRoundId = ref<SelectionOption['id']>();

  const selectionOptions = computed(() => {
    const stages = tournamentStore.activeTournament?.stages || [];

    return stages.flatMap((stage): SelectionOption[] => {
      if (stage.type === StageType.GROUP) {
        return [{ id: stage.id, name: stage.name }];
      }

      return stage.rounds.map(round => ({ id: round.id, name: round.name }));
    });
  });

  watch(() => selectionOptions.value.length, (length) => {
    selectedStageOrPlayoffRoundId.value = selectionOptions.value[length - 1]?.id;
  }, { immediate: true });

  return {
    selectionOptions,
    selectedStageOrPlayoffRoundId,
  };
});
