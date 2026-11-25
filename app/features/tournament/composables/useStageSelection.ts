export function useStageSelection() {
  const tournamentStore = useTournamentStore();
  const stageStore = useStageStore();

  const selectedStageId = ref<TournamentStage['id']>();
  const selectedPlayoffRoundId = ref<PlayoffRound['id']>();

  const stageOptions = computed(() => tournamentStore.activeTournament?.stages ?? []);

  watchEffect(() => {
    selectedStageId.value = tournamentStore.activeTournament?.stages[0]?.id;
  });

  watchEffect(() => {
    selectedPlayoffRoundId.value = stageStore.activePlayoffStage?.rounds[0].id;
  });

  return {
    selectedStageId,
    selectedPlayoffRoundId,
    stageOptions,
  };
}
