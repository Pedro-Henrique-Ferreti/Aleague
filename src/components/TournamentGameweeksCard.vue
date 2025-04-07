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
      <AppMatch
        v-for="match in gameweeksInput[currentGameweek - 1].matches"
        v-model:home-score="match.homeTeamScore"
        v-model:away-score="match.awayTeamScore"
        :key="match.id"
        :home-team="match.homeTeam"
        :away-team="match.awayTeam"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { TournamentStageGameweek } from '@/types/Tournament';
import { computed, ref, type PropType } from 'vue';
import IconChevronRight from '@/assets/icons/ChevronRight.svg';
import IconChevronLeft from '@/assets/icons/ChevronLeft.svg';
import AppIconButton from './AppIconButton.vue';
import AppMatch from './AppMatch.vue';
import TournamentGameweeksCardDropdown from './TournamentGameweeksCardDropdown.vue';

const emit = defineEmits(['update:gameweeks']);
const props = defineProps({
  gameweeks: {
    type: Array as PropType<TournamentStageGameweek[]>,
    required: true,
  },
});

const gameweeksInput = computed({
  get: () => props.gameweeks,
  set: (value) => emit('update:gameweeks', value),
});

const currentGameweek = ref(
  props.gameweeks.find(({ matches }) => (
    matches.some((match) => (
      match.homeTeamScore === null || match.awayTeamScore === null
    ))
  ))?.gameweek || props.gameweeks[0].gameweek,
);

const disablePreviousButton = computed(() => currentGameweek.value === 1);
const disableNextButton = computed(() => currentGameweek.value === props.gameweeks.length);
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
    gap: 0.75rem;
  }
}
</style>
