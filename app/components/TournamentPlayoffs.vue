<template>
  <div>
    <div class="grid grid-cols-4 justify-center gap-2">
      <PlayoffRound
        v-for="round, index in stage.rounds.filter((r) => displayedRoundsId.includes(r.id))"
        v-model:name="round.name"
        v-model:slots="round.slots"
        :key="round.id"
        @slot-winner-updated="moveTeamToNextRound($event.team, $event.slotIndex,  index)"
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

function moveTeamToNextRound(winner: PlayoffRoundWinner, slotIndex: number, roundIndex: number) {
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
