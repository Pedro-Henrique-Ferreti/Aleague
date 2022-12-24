<template>
  <div class="playoff-card">
    <div class="playoff-card__teams">
      <span
        v-text="homeTeamName"
        class="playoff-card__team"
        :class="{ 'playoff-card__team--empty': !homeTeamName }"
      />
      <span
        v-text="awayTeamName"
        class="playoff-card__team"
        :class="{ 'playoff-card__team--empty': !awayTeamName }"
      />
    </div>
    <div
      v-for="game in confrontation.games"
      :key="game.id"
      class="playoff-card__game"
    >
      <input
        class="playoff-card__game-input"
        type="number"
        placeholder="-"
      />
      <input
        class="playoff-card__game-input"
        type="number"
        placeholder="-"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { PlayoffConfrontation } from '@/types/Playoff';
import { computed } from 'vue';

const props = defineProps({
  confrontation: {
    type: Object as PropType<PlayoffConfrontation>,
    required: true,
  },
});

// Team names
const homeTeamName = computed(() => {
  const { homeTeamId } = props.confrontation.games[0];

  if (!homeTeamId) {
    return '';
  }

  return props.confrontation.teams.find(({ id }) => id === homeTeamId)?.name;
});

const awayTeamName = computed(() => {
  const { awayTeamId } = props.confrontation.games[0];

  if (!awayTeamId) {
    return '';
  }

  return props.confrontation.teams.find(({ id }) => id === awayTeamId)?.name;
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
