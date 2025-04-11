<template>
  <section class="gameweeks-card | app-base-card">
    <header class="gameweeks-card__header">
      <AppIconButton
        v-tooltip="'Rodada anterior'"
        color="secondary"
        size="small"
        aria-label="Mostrar rodada anterior"
        :icon="IconChevronLeft"
        :disabled="disablePreviousButton"
        @click="currentGameweek -= 1"
      />
      <TournamentGameweeksCardDropdown
        v-model:gameweek="currentGameweek"
        :gameweek-count="gameweeks.length"
      >
        <button
          class="gameweeks-card__title"
          type="button"
        >
          Rodada {{ currentGameweek }}
        </button>
      </TournamentGameweeksCardDropdown>
      <AppIconButton
        v-tooltip="'Próxima rodada'"
        color="secondary"
        size="small"
        aria-label="Mostrar próxima rodada"
        :icon="IconChevronRight"
        :disabled="disableNextButton"
        @click="currentGameweek += 1"
      />
    </header>
    <div class="gameweeks-card__matches">
      <template
        v-for="(match, index) in gameweeks[currentGameweek - 1].matches"
        :key="match.id"
      >
        <span
          v-if="showMatchDates[index]"
          class="gameweeks-card__match-date"
        >
          {{ WEEKDAYS[match.weekDay].split('-')[0] }} • {{ match.time }}
        </span>
        <AppMatch
          v-model:home-score="match.homeTeamScore"
          v-model:away-score="match.awayTeamScore"
          class="gameweeks-card__match"
          :home-team="match.homeTeam"
          :away-team="match.awayTeam"
        />
      </template>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { TournamentStageGameweek } from '@/types/Tournament';
import { computed, ref } from 'vue';
import { WEEKDAYS } from '@/constants/weekDays';
import IconChevronRight from '@/assets/icons/ChevronRight.svg';
import IconChevronLeft from '@/assets/icons/ChevronLeft.svg';
import AppIconButton from './AppIconButton.vue';
import AppMatch from './AppMatch.vue';
import TournamentGameweeksCardDropdown from './TournamentGameweeksCardDropdown.vue';

const gameweeks = defineModel<TournamentStageGameweek[]>('gameweeks', { required: true });

const currentGameweek = ref(
  gameweeks.value.find(({ matches }) => (
    matches.some((match) => (
      match.homeTeamScore === null || match.awayTeamScore === null
    ))
  ))?.gameweek || gameweeks.value[0].gameweek,
);

const disablePreviousButton = computed(() => currentGameweek.value === 1);
const disableNextButton = computed(() => currentGameweek.value === gameweeks.value.length);

const showMatchDates = computed(() => (
  gameweeks.value[currentGameweek.value - 1].matches.map((match, index) => {
    const previousMatch = gameweeks.value[currentGameweek.value - 1].matches[index - 1];

    if (!previousMatch) return true;

    return previousMatch.weekDay !== match.weekDay || previousMatch.time !== match.time;
  })
));
</script>

<style lang="scss" scoped>
.gameweeks-card {
  --base-card--padding: 1.25rem 1rem;
  position: sticky;
  top: 1.5rem;
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 0.75rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid $color--neutral-300;
  }
  &__title {
    color: $color--text-strong;
    font-weight: $font-weight--medium;
    &:hover {
      text-decoration: underline;
    }
  }
  &__matches {
    display: grid;
    gap: 0.5rem;
  }
  &__match {
    &:not(:last-child) {
      margin-bottom: 0.25rem;
    }
  }
  &__match-date {
    color: $color--text-strong;
    font-size: 0.875rem;
    font-weight: $font-weight--medium;
    text-align: center;
  }
}
</style>
