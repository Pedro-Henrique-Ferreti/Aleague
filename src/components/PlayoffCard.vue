<template>
  <div class="playoff-card">
    <div class="playoff-card__container">
      <div class="playoff-card__teams">
        <template
          v-for="team, index in [teamA, teamB]"
          :key="index"
        >
          <TeamSlot
            v-if="!team?.id"
            small
          >
            A definir
          </TeamSlot>
          <span
            v-else
            v-text="team?.name"
            :class="{
              'text-lighten': (confrontationWinner && confrontationWinner.id !== team?.id)
            }"
          />
        </template>
      </div>
      <div class="playoff-card__game">
        <PlayoffCardInput v-model="firstGameScoreTeamA" />
        <PlayoffCardInput v-model="firstGameScoreTeamB" />
      </div>
      <div
        v-if="confrontationHasTwoLegs"
        class="playoff-card__game"
      >
        <PlayoffCardInput v-model="secondGameScoreTeamA" />
        <PlayoffCardInput v-model="secondGameScoreTeamB" />
      </div>
    </div>
    <div
      v-show="confrontationIsDrew"
      class="playoff-card__penalty-wrapper"
    >
      <button
        class="playoff-card__penalty-button"
        type="button"
        title="Sortear pênaltis"
        aria-label="Sortear pênaltis"
        @click="getRandomPenaltyScore"
      >
        <BaseIcon
          class="playoff-card__penalty-button-icon"
          icon="dice"
        />
      </button>
      <div class="playoff-card__penalty-inputs">
        <PlayoffCardInput v-model="penaltyScoreTeamA" />
        <PlayoffCardInput v-model="penaltyScoreTeamB" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { PlayoffConfrontationGames, ScoreInput } from '@/types/Playoff';
import { computed, watch } from 'vue';
import PlayoffCardInput from './PlayoffCardInput.vue';
import TeamSlot from './TeamSlot.vue';

const emit = defineEmits([
  'update:firstGameScoreTeamA',
  'update:firstGameScoreTeamB',
  'update:secondGameScoreTeamA',
  'update:secondGameScoreTeamB',
  'update:penaltyScoreTeamA',
  'update:penaltyScoreTeamB',
  'update-next-round',
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

const isNumber = (n: unknown) => Number.isInteger(n);

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
const teamA = computed(() => props.games[0].homeTeam);
const teamB = computed(() => props.games[0].awayTeam);

const confrontationHasTwoLegs = computed(() => props.games[1]);

const firstGameIsOver = computed(() => (
  isNumber(firstGameScoreTeamA.value) && isNumber(firstGameScoreTeamB.value)
));

const secondGameIsOver = computed(() => (
  isNumber(secondGameScoreTeamA.value) && isNumber(secondGameScoreTeamB.value)
));

const penaltyShootoutIsOver = computed(() =>(
  isNumber(penaltyScoreTeamA.value) && isNumber(penaltyScoreTeamB.value)
));

const confrontationIsDrew = computed(() => {
  if (
    !firstGameIsOver.value
    || (confrontationHasTwoLegs.value && !secondGameIsOver.value)
  ) {
    return false;
  }

  const scoreTeamA = Number(firstGameScoreTeamA.value) + Number(secondGameScoreTeamA.value);
  const scoreTeamB = Number(firstGameScoreTeamB.value) + Number(secondGameScoreTeamB.value);

  return scoreTeamA === scoreTeamB;
});

const confrontationWinner = computed(() => {
  const scoreTeamA = (
    Number(firstGameScoreTeamA.value)
    + Number(secondGameScoreTeamA.value)
    + Number(penaltyScoreTeamA.value)
  );
  const scoreTeamB = (
    Number(firstGameScoreTeamB.value)
    + Number(secondGameScoreTeamB.value)
    + Number(penaltyScoreTeamB.value)
  );

  if (
    !firstGameIsOver.value
    || (confrontationHasTwoLegs.value && !secondGameIsOver.value)
    || (confrontationIsDrew.value && !penaltyShootoutIsOver.value)
    || scoreTeamA === scoreTeamB
  ) {
    return null;
  }

  const winner = (scoreTeamA > scoreTeamB) ? teamA.value : teamB.value;

  return winner;
});

// Clear penalty shootout score
watch(() => confrontationIsDrew.value , () => {
  penaltyScoreTeamA.value = null;
  penaltyScoreTeamB.value = null;
});

function getRandomPenaltyScore() {
  if (new Date().getTime() % 2 === 0) {
    penaltyScoreTeamA.value = 5;
    penaltyScoreTeamB.value = 4;
  } else {
    penaltyScoreTeamA.value = 4;
    penaltyScoreTeamB.value = 5;
  }
}

// Check if confrontation has ended
watch(confrontationWinner, () => {
  emit('update-next-round', confrontationWinner.value);
});
</script>

<style lang="scss" scoped>
.playoff-card {
  --gap: 0.25rem;
  --container-width: 19rem;
  --penalty-width: 1.5rem;

  display: flex;
  align-items: center;
  gap: var(--gap);
  width: 100%;
  max-width: calc(var(--container-width) + var(--penalty-width) + var(--gap));
  min-height: 5rem;
  height: fit-content;
  &__container {
    display: flex;
    flex-grow: 1;
    gap: 0.5rem;
    max-width: var(--container-width);
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
  &__game {
    width: 2rem;
    background-color: $color--light-gray-2;
    border-radius: 0.375rem;
  }
  &__penalty-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    min-height: inherit;
  }
  &__penalty-inputs {
    width: var(--penalty-width);
    height: 3.5rem;
    background-color: $color--light-gray-2;
    border-radius: 0.25rem;
    font-size: 0.875rem;
  }
  &__penalty-button {
    @include focus-ring;
    width: 1rem;
    height: 1rem;
  }
  &__penalty-button-icon {
    width: inherit;
    height: inherit;
    fill: $color--tertiary-400;
  }
}
</style>
