<template>
  <div class="playoffs-page">
    <TournamentPageStageControl
      v-model="selectedRoundId"
      :stages="[stage]"
    />
    <div
      class="playoffs-page__rounds"
      :data-max-rounds="displayedRounds.length - maxDisplayedRounds === 0"
    >
      <TournamentPlayoffRound
        v-for="round in displayedRounds"
        :round="round"
        :key="round.id"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TournamentPlayoffsStage } from '@/types/Tournament';
import { computed, ref, type PropType } from 'vue';
import { useBreakpoints } from '@vueuse/core';
import { Breakpoints } from '@/constants/breakpoints';
import TournamentPageStageControl from './TournamentPageStageControl.vue';
import TournamentPlayoffRound from './TournamentPlayoffRound.vue';

const breakpoints = useBreakpoints({
  ...Breakpoints,
  LARGE_DESKTOP_UP: 1500,
});

const props = defineProps({
  stage: {
    type: Object as PropType<TournamentPlayoffsStage>,
    required: true,
  },
});

const selectedRoundId = ref(props.stage.rounds[0].id);
const selectedRoundIndex = computed(() => (
  props.stage.rounds.findIndex((round) => round.id === selectedRoundId.value)
));

const maxDisplayedRounds = computed(() => {
  if (breakpoints.greaterOrEqual('LARGE_DESKTOP_UP').value) return 4;
  if (breakpoints.greaterOrEqual('DESKTOP_UP').value) return 3;
  if (breakpoints.greaterOrEqual('LARGE_TABLET_PORTRAIT_UP').value) return 2;
  return 1;
});

const displayedRounds = computed(() => props.stage.rounds.slice(
  selectedRoundIndex.value,
  selectedRoundIndex.value + maxDisplayedRounds.value,
));
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
      &[data-max-rounds="true"] {
        justify-content: space-between;
      }
    }
  }
}
</style>
