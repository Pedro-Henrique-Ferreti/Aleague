<template>
  <div
    v-if="showControls"
    role="tablist"
    class="tabs tabs-border mb-1.5"
  >
    <button
      v-for="option in roundOptions"
      v-text="option.name"
      :key="option.id"
      class="tab basis-1/2 @min-[35rem]/main:basis-1/4 @min-[56rem]/main:basis-1/7"
      type="button"
      role="tab"
      :class="{ 'tab-active': roundId === option.id }"
      @click="roundId = option.id"
    />
  </div>
</template>

<script lang="ts">
interface RoundOption {
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

const roundOptions = computed(() => stages.value.flatMap((stage): RoundOption[] => {
  if (stage.type === StageType.GROUP) {
    return [{ id: stage.id, name: stage.name }];
  }

  return stage.rounds.map(round => ({ id: round.id, name: round.name }));
}));

const roundId = ref<RoundOption['id'] | undefined>(roundOptions.value[0]?.id);

watch(() => roundOptions.value.length, (length) => {
  if (length === 0) {
    roundId.value = undefined;
    return;
  }

  roundId.value = roundOptions.value[roundOptions.value.length - 1]?.id;
});

defineExpose({ roundId });
</script>
