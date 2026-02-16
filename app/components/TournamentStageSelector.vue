<template>
  <div
    v-if="showControls"
    role="tablist"
    class="tabs tabs-border mb-1.5"
  >
    <button
      v-for="option in selectionOptions"
      v-text="option.name"
      :key="option.id"
      class="tab basis-1/2 @min-[35rem]/main:basis-1/4 @min-[56rem]/main:basis-1/7"
      type="button"
      role="tab"
      :class="{ 'tab-active': selectedStageOrPlayoffRoundId === option.id }"
      @click="selectedStageOrPlayoffRoundId = option.id"
    />
  </div>
</template>

<script lang="ts">
interface SelectionOption {
  id: GroupStage['id'] | PlayoffRound['id'];
  name: string;
}
</script>

<script lang="ts" setup>
const store = useTournamentStore();

const stages = computed(() => store.activeTournament?.stages || []);

const showControls = computed(() => (
  stages.value.length > 1 || stages.value[0]?.type === StageType.PLAYOFF
));

const selectionOptions = computed(() => stages.value.flatMap((stage): SelectionOption[] => {
  if (stage.type === StageType.GROUP) {
    return [{ id: stage.id, name: stage.name }];
  }

  return stage.rounds.map(round => ({ id: round.id, name: round.name }));
}));

const selectedStageOrPlayoffRoundId = ref<SelectionOption['id'] | undefined>(selectionOptions.value[0]?.id);

watch(() => selectionOptions.value.length, (length) => {
  if (length === 0) {
    selectedStageOrPlayoffRoundId.value = undefined;
    return;
  }

  selectedStageOrPlayoffRoundId.value = selectionOptions.value[selectionOptions.value.length - 1]?.id;
});

defineExpose({ selectedStageOrPlayoffRoundId });
</script>
