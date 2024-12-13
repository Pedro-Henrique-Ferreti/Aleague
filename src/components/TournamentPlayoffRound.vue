<template>
  <div class="playoff-round">
    <BaseInput
      v-model.trim.lazy="nameInput"
      class="playoff-round__name-input"
      id=""
      type="text"
      headless
    />
    <div class="playoff-round__matchups">
      <div
        v-for="matchup in matchupsInput"
        class="playoff-round__matchup-card | app-base-card"
        :key="matchup.id"
      >
        <AppMatch
          v-model:home-score="matchup.games[0].homeTeamScore"
          v-model:away-score="matchup.games[0].awayTeamScore"
          direction="vertical"
          :home-team="matchup.games[0].homeTeam"
          :away-team="matchup.games[0].awayTeam"
          :fixture-two-home-score="matchup.games[1]?.homeTeamScore"
          :fixture-two-away-score="matchup.games[1]?.awayTeamScore"
          @update:fixture-two-home-score="(
            (matchup.games[1]) ? matchup.games[1].homeTeamScore = $event : null
          )"
          @update:fixture-two-away-score="(
            (matchup.games[1]) ? matchup.games[1].awayTeamScore = $event : null
          )"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TournamentStageRoundMatchup } from '@/types/Tournament';
import { computed, type PropType } from 'vue';
import BaseInput from './BaseInput.vue';
import AppMatch from './AppMatch.vue';

const emit = defineEmits(['update:name', 'update:matchups']);
const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  matchups: {
    type: Array as PropType<TournamentStageRoundMatchup[]>,
    required: true,
  },
});

const nameInput = computed({
  get: () => props.name,
  set: (name) => emit('update:name', name),
});

const matchupsInput = computed({
  get: () => props.matchups,
  set: (matchups) => emit('update:matchups', matchups),
});
</script>

<style lang="scss" scoped>
.playoff-round {
  & + .playoff-round {
    --brackets-display: block;
  }
  &:nth-child(3) {
    --brackets-height: 2.125;
  }
  &:nth-child(4) {
    --brackets-height: 4.25;
  }
  width: 100%;
  max-width: 20rem;
  &__name-input {
    width: 100%;
    height: 2.5rem;
    margin-bottom: 1.5rem;
    background-color: transparent;
    border: 0;
    border-radius: $radius--medium;
    color: $color--text-strong;
    font-size: 1.25rem;
    font-weight: $font-weight--medium;
    text-align: center;
  }
  &__matchups {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
  }
  &__matchup-card {
    --base-card--padding: 0.75rem;
    width: 100%;
    border-radius: $radius--large;
    position: relative;
    &:not(:last-child) {
      margin-bottom: 0.5rem;
      &:nth-child(even) {
        margin-bottom: 1.5rem;
      }
    }
    &::before,
    &::after {
      content: '';
      display: var(--brackets-display, none);
      pointer-events: none;
    }
    &::before {
      width: 1.625rem;
      height: calc(var(--brackets-height, 1) * 6.375rem);
      border: 0.125rem solid $color--text-400;
      border-left: 0;
      border-top-right-radius: 0.625rem;
      border-bottom-right-radius: 0.625rem;
      position: absolute;
      top: 50%;
      left: -4.125rem;
      transform: translateY(-50%);
    }
    &::after {
      width: 2.5rem;
      height: 0.125rem;
      background-color: $color--text-400;
      position: absolute;
      top: 50%;
      left: -2.5rem;
      transform: translateY(-50%);
    }
  }
}
</style>
