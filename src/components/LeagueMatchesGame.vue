<template>
  <div class="league-game">
    <span>{{ homeTeam }}</span>
    <div class="league-game__input-wrapper">
      <input
        v-model="homeTeamScore"
        class="league-game__score-input"
        type="number"
        :aria-label="`Gols ${homeTeam}`"
      />
      <BaseIcon
        class="league-game__icon-versus"
        icon="close"
      />
      <input
        v-model="awayTeamScore"
        class="league-game__score-input"
        type="number"
        :aria-label="`Gols ${awayTeam}`"
      />
    </div>
    <span class="text-right">{{ awayTeam }}</span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const emit = defineEmits(['update:homeTeamScore', 'update:awayTeamScore']);
const props = defineProps({
  homeTeam: {
    type: String,
    required: true,
  },
  awayTeam: {
    type: String,
    required: true,
  },
  homeTeamScore: {
    type: [Number, String],
  },
  awayTeamScore: {
    type: [Number, String],
  },
});

const homeTeamScore = computed({
  get() {
    return props.homeTeamScore;
  },
  set(value) {
    emit('update:homeTeamScore', value);
  },
});

const awayTeamScore = computed({
  get() {
    return props.awayTeamScore;
  },
  set(value) {
    emit('update:awayTeamScore', value);
  },
});
</script>

<style lang="scss" scoped>
.league-game {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 0.5rem;
  align-items: center;
  font-size: 0.95rem;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
  &__input-wrapper {
    display: flex;
    gap: 0.375rem;
    align-items: center;
  }
  &__score-input {
    width: 1.875rem;
    height: 1.875rem;
    background-color: $color--white;
    border: 1px solid $color--light-gray-1;
    border-radius: 0.25rem;
    font-size: 1rem;
    text-align: center;
    outline: none;
    transition: border-color $transition--fastest ease;
    &:focus {
      border-color: $color--primary;
    }
  }
  &__icon-versus {
    width: 0.625rem;
    fill: $color--text-lighten;
  }
}
</style>
