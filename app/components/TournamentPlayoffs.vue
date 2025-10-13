<template>
  <div>
    <div class="grid grid-cols-4 justify-center gap-2">
      <PlayoffRound
        v-for="round in stage.rounds.filter((r) => displayedRoundsId.includes(r.id))"
        v-model:name="round.name"
        v-model:slots="round.slots"
        :key="round.id"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const DISPLAYED_ROUNDS_MAX = 4;

const props = defineProps<{
  activeRoundId: PlayoffRound['id'];
}>();

const stage = defineModel<TournamentPlayoffsStage>({ required: true });

const activeRoundIndex = computed(() => (
  stage.value.rounds.findIndex((round) => round.id === props.activeRoundId)
));

const displayedRoundsId = computed(() => (
  stage.value.rounds.slice(activeRoundIndex.value, activeRoundIndex.value + DISPLAYED_ROUNDS_MAX).map((i) => i.id)
));
</script>
