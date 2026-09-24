<template>
  <div ref="container">
    <div
      class="grid grid-cols-(--columns) justify-center gap-6.25"
      :style="`--columns: repeat(${displayedRoundsCount}, 1fr)`"
    >
      <template v-for="round, index in stage.rounds">
        <PlayoffRound
          v-if="displayedRoundsId.includes(round.id)"
          v-model="stage.rounds[index]!"
          :key="round.id"
          :card-dropdown-position="getRoundCardDropdownPosition(round)"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PlayoffRoundProps } from './PlayoffRound.vue';
import { useResizeObserver } from '@vueuse/core';
import { getPlayoffRoundSlotWinner } from '~/helpers/playoff-slot';
import { moveTeamToNextRound } from '~/helpers/playoff-stage';

type SlotResult = Parameters<typeof moveTeamToNextRound>[1];

const props = defineProps<{
  activeRoundId: PlayoffRound['id'];
}>();

const containerEl = useTemplateRef('container');

const displayedRoundsCount = ref(0);

useResizeObserver(containerEl, ([entry]) => {
  if (!entry) return;

  const { width } = entry.contentRect;

  if (width > 1440) {
    displayedRoundsCount.value = 4;
  } else if (width > 1024) {
    displayedRoundsCount.value = 3;
  } else if (width > 640) {
    displayedRoundsCount.value = 2;
  } else {
    displayedRoundsCount.value = 1;
  }
});

const stage = defineModel<PlayoffStage>({ required: true });

const activeRoundIndex = computed(() => (
  stage.value.rounds.findIndex(round => round.id === props.activeRoundId)
));

const displayedRoundsId = computed(() => (
  stage.value.rounds.slice(activeRoundIndex.value, activeRoundIndex.value + displayedRoundsCount.value).map(i => i.id)
));

const slotResults = computed<SlotResult[]>(() => {
  return stage.value.rounds.flatMap((r, roundIndex) => r.slots.flatMap((slot, slotIndex) => ({
    roundIndex,
    slotIndex,
    winner: getPlayoffRoundSlotWinner(slot),
  })));
});

watch(slotResults, (newResults, oldResults) => {
  newResults.forEach((result, index) => {
    if (result.winner !== oldResults[index]?.winner) {
      moveTeamToNextRound(stage.value, result);
    }
  });
});

function getRoundCardDropdownPosition(round: PlayoffRound): PlayoffRoundProps['cardDropdownPosition'] {
  const position = displayedRoundsId.value.findIndex(id => id === round.id) + 1;
  return displayedRoundsCount.value === position ? 'left' : undefined;
}
</script>
