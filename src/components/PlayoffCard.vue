<template>
  <div class="playoff-card">
    <div class="playoff-card__teams">
      <span
        v-text="confrontation[0].homeTeamName"
        class="playoff-card__team"
        :class="{ 'playoff-card__team--empty': !confrontation[0].homeTeamName }"
      />
      <span
        v-text="confrontation[0].awayTeamName"
        class="playoff-card__team"
        :class="{ 'playoff-card__team--empty': !confrontation[0].awayTeamName }"
      />
    </div>
    <div class="playoff-card__game">
      <input
        v-model="firstGameHomeTeamScore"
        class="playoff-card__game-input"
        type="number"
        placeholder="-"
      />
      <input
        v-model="firstGameAwayTeamScore"
        class="playoff-card__game-input"
        type="number"
        placeholder="-"
      />
    </div>
    <div
      v-if="confrontation[1]"
      class="playoff-card__game"
    >
      <input
        v-model="secondGameAwayTeamScore"
        class="playoff-card__game-input"
        type="number"
        placeholder="-"
      />
      <input
        v-model="secondGameHomeTeamScore"
        class="playoff-card__game-input"
        type="number"
        placeholder="-"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { PlayoffConfrontation, ScoreInput } from '@/types/Playoff';
import { computed } from 'vue';

const emit = defineEmits([
  'update:firstGameHomeTeamScore',
  'update:firstGameAwayTeamScore',
  'update:secondGameHomeTeamScore',
  'update:secondGameAwayTeamScore',
]);

const props = defineProps({
  confrontation: {
    type: Object as PropType<PlayoffConfrontation>,
    required: true,
  },
  firstGameHomeTeamScore: {
    type: [Number, String] as PropType<ScoreInput>,
    default: null,
  },
  firstGameAwayTeamScore: {
    type: [Number, String] as PropType<ScoreInput>,
    default: null,
  },
  secondGameHomeTeamScore: {
    type: [Number, String] as PropType<ScoreInput>,
    default: null,
  },
  secondGameAwayTeamScore: {
    type: [Number, String] as PropType<ScoreInput>,
    default: null,
  },
});

// Model values
const firstGameHomeTeamScore = computed({
  get: () => props.firstGameHomeTeamScore as number,
  set: (value: number) => emit('update:firstGameHomeTeamScore', value),
});

const firstGameAwayTeamScore = computed({
  get: () => props.firstGameAwayTeamScore as number,
  set: (value: number) => emit('update:firstGameAwayTeamScore', value),
});

const secondGameHomeTeamScore = computed({
  get: () => props.secondGameHomeTeamScore as number,
  set: (value: number) => emit('update:secondGameHomeTeamScore', value),
});

const secondGameAwayTeamScore = computed({
  get: () => props.secondGameAwayTeamScore as number,
  set: (value: number) => emit('update:secondGameAwayTeamScore', value),
});

</script>

<style lang="scss" scoped>
.playoff-card {
  display: flex;
  gap: 0.5rem;
  width: 100%;
  max-width: 19rem;
  min-height: 5rem;
  height: fit-content;
  &__teams {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.75rem;
    border: 1px solid $color--light-gray-1;
    border-radius: 0.5rem;
  }
  &__team {
    &--empty {
      width: 100%;
      height: 1.5rem;
      background-image: linear-gradient(#F5F5F5 0%, #F4F4F4 100%);
      border-radius: 0.25rem;
    }
  }
  &__game {
    width: 2rem;
    background: $color--light-gray-2;
    border-radius: 0.375rem;
  }
  &__game-input {
    @include focus-ring;
    width: 100%;
    height: 50%;
    padding: 0.25rem;
    background-color: transparent;
    border: 0;
    border-radius: inherit;
    font-weight: $font-weight--semibold;
    text-align: center;
    &:focus {
      border: 1px solid $color--primary;
      box-shadow: 0 0 0 0.2rem get-hexadecimal-transparency($color--primary, 25);
      &::placeholder {
        opacity: 0;
      }
    }
  }
}
</style>
