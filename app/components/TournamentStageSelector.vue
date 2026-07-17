<template>
  <AppTablist
    v-if="showControls"
    class="mb-1.5"
  >
    <AppTab
      v-for="option in store.selectionOptions"
      :key="option.id"
      class="basis-1/2 @min-[35rem]/main:basis-1/4 @min-[56rem]/main:basis-1/7"
      :label="option.name"
      :is-active="store.selectedStageOrPlayoffRoundId === option.id"
      @click="store.selectedStageOrPlayoffRoundId = option.id"
    />
  </AppTablist>
</template>

<script lang="ts" setup>
const store = useStageSelectorStore();
const tournamentStore = useTournamentStore();

const showControls = computed(() => {
  const stages = tournamentStore.activeTournament?.stages || [];
  return stages.length > 1 || stages[0]?.type === StageType.PLAYOFF;
});
</script>
