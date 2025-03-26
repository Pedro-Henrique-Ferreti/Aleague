<template>
  <div
    class="match"
    :data-direction="direction"
    :data-tbd="!homeTeam?.id || !awayTeam?.id"
  >
    <BaseMatchTeam
      class="match__team"
      :team="homeTeam"
      :alignment="(direction === 'horizontal') ? 'right' : undefined"
    >
      <EmptySlotButton
        v-if="allowEmptySlotPlaceholder && homeTeam && !homeTeam.id"
        size="small"
        :to="emptySlotRouteLocation"
        @click="emit('empty-slot-click')"
      />
    </BaseMatchTeam>
    <div
      class="match__scores"
      :data-direction="direction"
      :data-tbd="!homeTeam?.id || !awayTeam?.id"
    >
      <template v-if="homeTeam?.id && awayTeam?.id">
        <div class="match__score">
          <BaseMatchScoreInput
            :placeholder="direction === 'vertical' ? '-' : null"
            :model-value="homeScore"
            @update:model-value="emit('update:home-score', $event)"
          />
          <BaseMatchScoreInput
            :placeholder="direction === 'vertical' ? '-' : null"
            :model-value="awayScore"
            @update:model-value="emit('update:away-score', $event)"
          />
        </div>
        <div
          v-if="fixtureTwoHomeScore !== undefined && fixtureTwoAwayScore !== undefined"
          class="match__score"
        >
          <BaseMatchScoreInput
            :placeholder="direction === 'vertical' ? '-' : null"
            :model-value="fixtureTwoAwayScore"
            @update:model-value="emit('update:fixture-two-away-score', $event)"
          />
          <BaseMatchScoreInput
            :placeholder="direction === 'vertical' ? '-' : null"
            :model-value="fixtureTwoHomeScore"
            @update:model-value="emit('update:fixture-two-home-score', $event)"
          />
        </div>
      </template>
    </div>
    <BaseMatchTeam
      class="match__team"
      data-away
      :team="awayTeam"
    >
      <EmptySlotButton
        v-if="allowEmptySlotPlaceholder && awayTeam && !awayTeam.id"
        size="small"
        :to="emptySlotRouteLocation"
        @click="emit('empty-slot-click')"
      />
    </BaseMatchTeam>
  </div>
</template>

<script lang="ts" setup>
import type { MatchPlaceholderTeam, MatchTeam } from '@/types/Match';
import type { PropType } from 'vue';
import type { RouteLocationRaw } from 'vue-router';
import BaseMatchTeam from './BaseMatchTeam.vue';
import BaseMatchScoreInput from './BaseMatchScoreInput.vue';
import EmptySlotButton from './EmptySlotButton.vue';

const emit = defineEmits([
  'update:home-score',
  'update:away-score',
  'update:fixture-two-home-score',
  'update:fixture-two-away-score',
  'empty-slot-click',
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
    type: Object as PropType<MatchTeam | MatchPlaceholderTeam | null>,
    default: null,
  },
  awayTeam: {
    type: Object as PropType<MatchTeam | MatchPlaceholderTeam | null>,
    default: null,
  },
  allowEmptySlotPlaceholder: {
    type: Boolean,
    default: false,
  },
  emptySlotRouteLocation: {
    type: [String, Object] as PropType<RouteLocationRaw>,
    default: '',
  },
});
</script>

<style lang="scss" scoped>
.match {
  display: grid;
  width: 100%;
  &[data-direction="vertical"] {
    grid-template-columns: 1fr auto;
    place-items: center normal;
    row-gap: 0.375rem;
    &[data-tbd="false"] {
      column-gap: 0.75rem;
    }
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
