<template>
  <div
    class="match"
    :data-direction="direction"
  >
    <div
      class="match__team"
      data-home
    >
      <img
        class="match__team-emblem"
        :src="homeTeam?.emblem.url"
        :alt="`${homeTeam?.name}'s emblem`"
      />
      <span>{{ homeTeam?.name }}</span>
    </div>
    <div
      class="match__scores"
      :data-direction="direction"
    >
      <div class="match__score">
        <BaseInput
          class="match__score-input"
          headless
          id=""
          :model-modifiers="{ lazy: true }"
          :mask="Number"
          :mask-options="MASK_OPTIONS"
          :model-value="getModelValue(homeScore)"
          @update:model-value="updateModelValue('update:home-score', $event)"
        />
        <BaseInput
          class="match__score-input"
          headless
          id=""
          :model-modifiers="{ lazy: true }"
          :mask="Number"
          :mask-options="MASK_OPTIONS"
          :model-value="getModelValue(awayScore)"
          @update:model-value="updateModelValue('update:away-score', $event)"
        />
      </div>
      <div
        v-if="fixtureTwoHomeScore !== undefined && fixtureTwoAwayScore !== undefined"
        class="match__score"
      >
        <BaseInput
          class="match__score-input"
          headless
          id=""
          :model-modifiers="{ lazy: true }"
          :mask="Number"
          :mask-options="MASK_OPTIONS"
          :model-value="getModelValue(fixtureTwoHomeScore)"
          @update:model-value="updateModelValue('update:fixture-two-home-score', $event)"
        />
        <BaseInput
          class="match__score-input"
          headless
          id=""
          :model-modifiers="{ lazy: true }"
          :mask="Number"
          :mask-options="MASK_OPTIONS"
          :model-value="getModelValue(fixtureTwoAwayScore)"
          @update:model-value="updateModelValue('update:fixture-two-away-score', $event)"
        />
      </div>
    </div>
    <div
      class="match__team"
      data-away
    >
      <img
        class="match__team-emblem"
        :src="awayTeam?.emblem.url"
        :alt="`${awayTeam?.name}'s emblem`"
      />
      <span>{{ awayTeam?.name }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { MatchTeam } from '@/types/Match';
import type { PropType } from 'vue';
import BaseInput from './BaseInput.vue';

const MASK_OPTIONS = { min: 0, max: 99 } as const;

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

function getModelValue(value: number | null) {
  return (typeof value === 'number') ? String(value) : '';
}

function updateModelValue(event: Parameters<typeof emit>[0], value: string) {
  emit(event, (value === '') ? null : +value);
}
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
  &__team {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: $color--text-strong;
  }
  &__team-emblem {
    max-width: 1.5rem;
    max-height: 1.5rem;
  }
  &__scores {
    display: flex;
    &[data-direction="horizontal"] {
      flex-direction: column;
      gap: 0.125rem;
    }
    &[data-direction="vertical"] {
      grid-column: 2 / 3;
      grid-row: 1 / 3;
      gap: 0.25rem;
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
  &__score-input {
    width: 2rem;
    height: 2rem;
    background-color: transparent;
    border: 1px solid transparent;
    border-radius: inherit;
    font-weight: $font-weight--medium;
    text-align: center;
    transition: border-color $transition--fastest linear;
    &:hover,
    &:focus {
      border-color: $color--text-400;
      outline: none;
    }
    &:first-child {
      order: -1;
    }
  }
}
</style>
