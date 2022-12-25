<template>
  <div class="playoff-card">
    <div class="playoff-card__container">
      <div class="playoff-card__teams">
        <span
          v-text="nameTeamA"
          class="playoff-card__team"
          :class="{ 'playoff-card__team--empty': !nameTeamA }"
        />
        <span
          v-text="nameTeamB"
          class="playoff-card__team"
          :class="{ 'playoff-card__team--empty': !nameTeamB }"
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
    <div
      v-show="showPenaltiShootoutInputs"
      class="playoff-card__penalty-wrapper"
    >
      <div class="playoff-card__penalty-shootout">
        <input
          v-model="homeTeamPenaltyShootoutScore"
          class="playoff-card__game-input"
          type="number"
          placeholder="-"
        />
        <input
          v-model="awayTeamPenaltyShootoutScore"
          class="playoff-card__game-input"
          type="number"
          placeholder="-"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { PlayoffConfrontation, ScoreInput } from '@/types/Playoff';
import { computed, watch } from 'vue';

const emit = defineEmits([
  'update:firstGameHomeTeamScore',
  'update:firstGameAwayTeamScore',
  'update:secondGameHomeTeamScore',
  'update:secondGameAwayTeamScore',
  'update:homeTeamPenaltyShootoutScore',
  'update:awayTeamPenaltyShootoutScore',
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
  homeTeamPenaltyShootoutScore: {
    type: [Number, String] as PropType<ScoreInput>,
    default: null,
  },
  awayTeamPenaltyShootoutScore: {
    type: [Number, String] as PropType<ScoreInput>,
    default: null,
  },
});

// Model values
const firstGameHomeTeamScore = computed({
  get: () => props.firstGameHomeTeamScore as ScoreInput,
  set: (value: ScoreInput) => emit('update:firstGameHomeTeamScore', value),
});

const firstGameAwayTeamScore = computed({
  get: () => props.firstGameAwayTeamScore as ScoreInput,
  set: (value: ScoreInput) => emit('update:firstGameAwayTeamScore', value),
});

const secondGameHomeTeamScore = computed({
  get: () => props.secondGameHomeTeamScore as ScoreInput,
  set: (value: ScoreInput) => emit('update:secondGameHomeTeamScore', value),
});

const secondGameAwayTeamScore = computed({
  get: () => props.secondGameAwayTeamScore as ScoreInput,
  set: (value: ScoreInput) => emit('update:secondGameAwayTeamScore', value),
});

const homeTeamPenaltyShootoutScore = computed({
  get: () => props.homeTeamPenaltyShootoutScore as ScoreInput,
  set: (value: ScoreInput) => emit('update:homeTeamPenaltyShootoutScore', value),
});

const awayTeamPenaltyShootoutScore = computed({
  get: () => props.awayTeamPenaltyShootoutScore as ScoreInput,
  set: (value: ScoreInput) => emit('update:awayTeamPenaltyShootoutScore', value),
});

// Team names
const nameTeamA = computed(() => props.confrontation[0].homeTeamName);
const nameTeamB = computed(() => props.confrontation[0].awayTeamName);

// Show penalty shootout inputs
const isValid = (n: unknown) => Number.isInteger(n);

const showPenaltiShootoutInputs = computed(() => {
  let scoreTeamA = firstGameHomeTeamScore.value as number;
  let scoreTeamB = firstGameAwayTeamScore.value as number;

  if (!isValid(scoreTeamA) || !isValid(scoreTeamB)) {
    return false;
  }

  if (props.confrontation[1]) {
    if (!isValid(secondGameHomeTeamScore.value) || !isValid(secondGameAwayTeamScore.value)) {
      return false;
    }

    scoreTeamA += (secondGameAwayTeamScore.value as number);
    scoreTeamB += (secondGameHomeTeamScore.value as number);
  }

  return scoreTeamA === scoreTeamB;
});

// Clear penalty shootout score
watch(() => showPenaltiShootoutInputs.value , () => {
  homeTeamPenaltyShootoutScore.value = null;
  awayTeamPenaltyShootoutScore.value = null;
});
</script>

<style lang="scss" scoped>
.playoff-card {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 5rem;
  height: fit-content;
  &__container {
    display: flex;
    flex-grow: 1;
    gap: 0.5rem;
    max-width: 19rem;
  }
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
    background-color: $color--light-gray-2;
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
  &__penalty-wrapper {
    margin-left: 0.25rem;
  }
  &__penalty-shootout {
    width: 1.5rem;
    height: 3rem;
    background-color: $color--light-gray-2;
    border-radius: 0.25rem;
    font-size: 0.875rem;
  }
}
</style>
