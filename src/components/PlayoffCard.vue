<template>
  <div class="playoff-card">
    <div class="playoff-card__container">
      <div class="playoff-card__teams">
        <span
          v-for="name, index in [nameTeamA, nameTeamB]"
          v-text="name"
          :key="index"
          :class="{ 'playoff-card__team--empty': !name }"
        />
      </div>
      <div class="playoff-card__game">
        <input
          v-model="firstGameScoreTeamA"
          class="playoff-card__game-input"
          type="number"
          placeholder="-"
        />
        <input
          v-model="firstGameScoreTeamB"
          class="playoff-card__game-input"
          type="number"
          placeholder="-"
        />
      </div>
      <div
        v-if="games[1]"
        class="playoff-card__game"
      >
        <input
          v-model="secondGameScoreTeamA"
          class="playoff-card__game-input"
          type="number"
          placeholder="-"
        />
        <input
          v-model="secondGameScoreTeamB"
          class="playoff-card__game-input"
          type="number"
          placeholder="-"
        />
      </div>
    </div>
    <div
      v-show="showPenaltiInputs"
      class="playoff-card__penalty-wrapper"
    >
      <div class="playoff-card__penalty-shootout">
        <input
          v-model="penaltyScoreTeamA"
          class="playoff-card__game-input"
          type="number"
          placeholder="-"
        />
        <input
          v-model="penaltyScoreTeamB"
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
import type { PlayoffConfrontationGames, ScoreInput } from '@/types/Playoff';
import { computed, watch } from 'vue';

const emit = defineEmits([
  'update:firstGameScoreTeamA',
  'update:firstGameScoreTeamB',
  'update:secondGameScoreTeamA',
  'update:secondGameScoreTeamB',
  'update:penaltyScoreTeamA',
  'update:penaltyScoreTeamB',
]);

const props = defineProps({
  games: {
    type: Object as PropType<PlayoffConfrontationGames>,
    required: true,
  },
  firstGameScoreTeamA: {
    type: [Number, String] as PropType<ScoreInput>,
    default: null,
  },
  firstGameScoreTeamB: {
    type: [Number, String] as PropType<ScoreInput>,
    default: null,
  },
  secondGameScoreTeamA: {
    type: [Number, String] as PropType<ScoreInput>,
    default: null,
  },
  secondGameScoreTeamB: {
    type: [Number, String] as PropType<ScoreInput>,
    default: null,
  },
  penaltyScoreTeamA: {
    type: [Number, String] as PropType<ScoreInput>,
    default: null,
  },
  penaltyScoreTeamB: {
    type: [Number, String] as PropType<ScoreInput>,
    default: null,
  },
});

// Model values
const firstGameScoreTeamA = computed({
  get: () => props.firstGameScoreTeamA as ScoreInput,
  set: (value: ScoreInput) => emit('update:firstGameScoreTeamA', value),
});

const firstGameScoreTeamB = computed({
  get: () => props.firstGameScoreTeamB as ScoreInput,
  set: (value: ScoreInput) => emit('update:firstGameScoreTeamB', value),
});

const secondGameScoreTeamA = computed({
  get: () => props.secondGameScoreTeamA as ScoreInput,
  set: (value: ScoreInput) => emit('update:secondGameScoreTeamA', value),
});

const secondGameScoreTeamB = computed({
  get: () => props.secondGameScoreTeamB as ScoreInput,
  set: (value: ScoreInput) => emit('update:secondGameScoreTeamB', value),
});

const penaltyScoreTeamA = computed({
  get: () => props.penaltyScoreTeamA as ScoreInput,
  set: (value: ScoreInput) => emit('update:penaltyScoreTeamA', value),
});

const penaltyScoreTeamB = computed({
  get: () => props.penaltyScoreTeamB as ScoreInput,
  set: (value: ScoreInput) => emit('update:penaltyScoreTeamB', value),
});

// Team names
const nameTeamA = computed(() => props.games[0].homeTeamName);
const nameTeamB = computed(() => props.games[0].awayTeamName);

// Show penalty shootout inputs
const isValid = (n: unknown) => Number.isInteger(n);

const showPenaltiInputs = computed(() => {
  let scoreTeamA = firstGameScoreTeamA.value as number;
  let scoreTeamB = firstGameScoreTeamB.value as number;

  if (!isValid(scoreTeamA) || !isValid(scoreTeamB)) {
    return false;
  }

  if (props.games[1]) {
    if (!isValid(secondGameScoreTeamA.value) || !isValid(secondGameScoreTeamB.value)) {
      return false;
    }

    scoreTeamA += (secondGameScoreTeamA.value as number);
    scoreTeamB += (secondGameScoreTeamB.value as number);
  }

  return scoreTeamA === scoreTeamB;
});

// Clear penalty shootout score
watch(() => showPenaltiInputs.value , () => {
  penaltyScoreTeamA.value = null;
  penaltyScoreTeamB.value = null;
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
    min-height: inherit;
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
