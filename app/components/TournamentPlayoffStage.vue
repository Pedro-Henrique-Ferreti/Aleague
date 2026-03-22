<template>
  <div ref="container">
    <div
      class="grid grid-cols-(--columns) justify-center gap-6.25"
      :style="`--columns: repeat(${displayedRoundsCount}, 1fr)`"
    >
      <PlayoffRound
        v-for="round in stage.rounds.filter((r) => displayedRoundsId.includes(r.id))"
        v-model:name="round.name"
        v-model:slots="round.slots"
        :key="round.id"
        @slot-winner-updated="moveTeamToNextRound($event.team, $event.slotIndex, round.id)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useResizeObserver } from '@vueuse/core';

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

function moveTeamToNextRound(winner: PlayoffRoundWinner, slotIndex: number, roundId: PlayoffRound['id']) {
  const roundIndex = stage.value.rounds.findIndex(round => round.id === roundId);

  if (roundIndex === -1) return;

  const round = stage.value.rounds[roundIndex + 1];

  if (!round) return;

  const slot = round.slots[Math.floor(slotIndex / 2)];

  if (!slot) return;

  const isFirstMatchHomeTeam = slotIndex % 2 === 0;

  if (isFirstMatchHomeTeam) {
    slot.legs[0].homeTeam.id = winner;
  } else {
    slot.legs[0].awayTeam.id = winner;
  }

  if (slot.legs[1]) {
    if (isFirstMatchHomeTeam) {
      slot.legs[1].awayTeam.id = winner;
    } else {
      slot.legs[1].homeTeam.id = winner;
    }
  }
}
</script>
