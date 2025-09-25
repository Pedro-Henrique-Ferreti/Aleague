<template>
  <header class="grid gap-1 mb-2 tablet-lg:grid-cols-[2fr_1fr] desktop:grid-cols-2">
    <TournamentProfileCard :tournament="tournament" />
    <div class="flex justify-end">
      <TournamentStageModal :tournament="tournament" />
    </div>
  </header>
  <TournamentStageControls
    v-if="showStageControls"
    v-model="roundId"
    :stages="tournament.stages"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  tournament: Tournament;
}>();

const roundId = ref(props.tournament.stages[0]?.id);

watch(() => props.tournament.stages.length, (length) => {
  if (length === 1) {
    roundId.value = props.tournament.stages[0]?.id;
  }
});

const showStageControls = computed(() => (
  props.tournament.stages.length > 1 || props.tournament.stages[0]?.type === TournamentStageType.PLAYOFFS
));
</script>
