<template>
  <div
    class="match"
    :data-direction="direction"
  >
    <AppMatchTeam
      class="match__team"
      data-home
      :team="homeTeam"
    />
    <div
      class="match__scores"
      :data-direction="direction"
      :data-tbd="!homeTeam || !awayTeam"
    >
      <template v-if="homeTeam && awayTeam">
        <div class="match__score">
          <AppMatchScoreInput
            :model-value="homeScore"
            @update:model-value="emit('update:home-score', $event)"
          />
          <AppMatchScoreInput
            :model-value="awayScore"
            @update:model-value="emit('update:away-score', $event)"
          />
        </div>
        <div
          v-if="fixtureTwoHomeScore !== undefined && fixtureTwoAwayScore !== undefined"
          class="match__score"
        >
          <AppMatchScoreInput
            :model-value="fixtureTwoHomeScore"
            @update:model-value="emit('update:fixture-two-home-score', $event)"
          />
          <AppMatchScoreInput
            :model-value="fixtureTwoAwayScore"
            @update:model-value="emit('update:fixture-two-away-score', $event)"
          />
        </div>
      </template>
    </div>
    <AppMatchTeam
      class="match__team"
      data-away
      :team="awayTeam"
    />
  </div>
</template>

<script lang="ts" setup>
import type { MatchTeam } from '@/types/Match';
import type { PropType } from 'vue';
import AppMatchTeam from './AppMatchTeam.vue';
import AppMatchScoreInput from './AppMatchScoreInput.vue';

const emit = defineEmits([
  'update:home-score',
  'update:away-score',
  'update:fixture-two-home-score',
  'update:fixture-two-away-score',
]);
defineProps({
  homeScore: {
    type: Number as PropType<number | null>,
    default: null,
  },
  awayScore: {
    type: Number as PropType<number | null>,
    default: null,
  },
  fixtureTwoHomeScore: {
    type: Number as PropType<number | null>,
    default: undefined,
  },
  fixtureTwoAwayScore: {
    type: Number as PropType<number | null>,
    default: undefined,
  },
  direction: {
    type: String as PropType<'vertical' | 'horizontal'>,
    default: 'horizontal',
  },
  homeTeam: {
    type: Object as PropType<MatchTeam | null>,
    default: null,
  },
  awayTeam: {
    type: Object as PropType<MatchTeam | null>,
    default: null,
  },
});
</script>

<style lang="scss" scoped>
.match {
  display: grid;
  width: 100%;
  &[data-direction="vertical"] {
    grid-template-columns: 1fr auto;
    place-items: center start;
    column-gap: 0.75rem;
  }
  &[data-direction="horizontal"] {
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 0.5rem;
    .match__team {
      &[data-home] {
        flex-direction: row-reverse;
        text-align: right;
      }
    }
  }
  &__scores {
    display: flex;
    &[data-direction="horizontal"] {
      flex-direction: column;
      gap: 0.125rem;
      &[data-tbd="true"] {
        &::after {
          content: '-';
          display: block;
          width: 5rem;
          height: 2rem;
          font-weight: $font-weight--medium;
          text-align: center;
        }
      }
    }
    &[data-direction="vertical"] {
      grid-column: 2 / 3;
      grid-row: 1 / 3;
      gap: 0.25rem;
      height: 4.25rem;
      .match__score {
        flex-direction: column;
        &::before {
          display: none;
        }
      }
    }
  }
  &__score {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    background-color: $color--neutral-50;
    border-radius: $radius--small;
    font-weight: $font-weight--medium;
    text-align: center;
    &::before {
      content: '-';
      display: block;
      font-weight: $font-weight--medium;
    }
  }
}
</style>
