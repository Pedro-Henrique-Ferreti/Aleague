<template>
  <div class="playoffs-page">
    <div
      class="playoffs-page__rounds"
      :data-display-max-rounds="displayedRoundsId.length - maxDisplayedRounds === 0"
    >
      <template
        v-for="round in stageValue.rounds"
        :key="round.id"
      >
        <TournamentPlayoffRound
          v-if="displayedRoundsId.includes(round.id)"
          v-model:name="round.name"
          v-model:matchups="round.matchups"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TournamentPlayoffsStage } from '@/types/Tournament';
import { computed, type PropType } from 'vue';
import { useBreakpoints } from '@vueuse/core';
import { Breakpoints } from '@/constants/breakpoints';
import TournamentPlayoffRound from './TournamentPlayoffRound.vue';

const breakpoints = useBreakpoints({
  ...Breakpoints,
  LARGE_DESKTOP_UP: 1500,
});

const emit = defineEmits(['update:stage']);
const props = defineProps({
  stage: {
    type: Object as PropType<TournamentPlayoffsStage>,
    required: true,
  },
  selectedRoundId: {
    type: String,
    default: '',
  },
});

const stageValue = computed({
  get: () => props.stage,
  set: (stage) => emit('update:stage', stage),
});

const selectedRoundIndex = computed(() => (
  props.stage.rounds.findIndex((round) => round.id === props.selectedRoundId)
));

const maxDisplayedRounds = computed(() => {
  if (breakpoints.greaterOrEqual('LARGE_DESKTOP_UP').value) return 4;
  if (breakpoints.greaterOrEqual('DESKTOP_UP').value) return 3;
  if (breakpoints.greaterOrEqual('LARGE_TABLET_PORTRAIT_UP').value) return 2;
  return 1;
});

const displayedRoundsId = computed(() => props.stage.rounds.slice(
  selectedRoundIndex.value,
  selectedRoundIndex.value + maxDisplayedRounds.value,
).map((round) => round.id));
</script>

<style lang="scss" scoped>
.playoffs-page {
  margin-top: 2rem;
  &__rounds {
    display: flex;
    justify-content: center;
    gap: 5rem;
    margin-top: 1.5rem;
    @include for-desktop-up {
      justify-content: flex-start;
      gap: 6rem;
      &[data-display-max-rounds="true"] {
        justify-content: space-between;
      }
    }
  }
}
</style>
