<template>
  <div
    v-if="showControls"
    role="tablist"
    class="tabs tabs-border mb-1.5"
  >
    <button
      v-for="option in store.selectionOptions"
      v-text="option.name"
      :key="option.id"
      class="tab basis-1/2 @min-[35rem]/main:basis-1/4 @min-[56rem]/main:basis-1/7"
      type="button"
      role="tab"
      :class="{ 'tab-active': store.selectedStageOrPlayoffRoundId === option.id }"
      @click="store.selectedStageOrPlayoffRoundId = option.id"
    />
  </div>
</template>

<script lang="ts" setup>
const store = useStageSelectorStore();
const tournamentStore = useTournamentStore();

const showControls = computed(() => {
  const stages = tournamentStore.activeTournament?.stages || [];
  return stages.length > 1 || stages[0]?.type === StageType.PLAYOFF;
});
</script>
