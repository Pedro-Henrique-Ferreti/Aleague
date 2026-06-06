interface SelectionOption {
  id: GroupStage['id'] | PlayoffRound['id'];
  name: GroupStage['name'] | PlayoffRound['name'];
  type: StageType;
  isFirstStageRound?: boolean;
}

export const useStageSelectorStore = defineStore('stage-selector', () => {
  const tournamentStore = useTournamentStore();

  const selectedStageOrPlayoffRoundId = ref<SelectionOption['id']>();

  const selectionOptions = computed(() => {
    const stages = tournamentStore.activeTournament?.stages ?? [];

    return stages.flatMap((stage): SelectionOption[] => {
      if (stage.type === StageType.GROUP) {
        return [{ id: stage.id, name: stage.name, type: StageType.GROUP }];
      }

      return stage.rounds.map((round, index): SelectionOption => ({
        id: round.id,
        name: round.name,
        type: StageType.PLAYOFF,
        isFirstStageRound: index === 0,
      }));
    });
  });

  watchEffect(() => {
    const lastOption = selectionOptions.value[selectionOptions.value.length - 1];
    const lastFirstRoundOption = selectionOptions.value.findLast(option => option.isFirstStageRound);

    selectedStageOrPlayoffRoundId.value = (lastOption?.type === StageType.GROUP ? lastOption : lastFirstRoundOption)?.id;
  });

  return {
    selectionOptions,
    selectedStageOrPlayoffRoundId,
  };
});
