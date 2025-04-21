<template>
  <div class="recent-matches">
    <Dropdown
      v-for="match in displayedGames"
      class="recent-matches__item"
      theme="match-tooltip"
      :auto-hide="false"
      :key="match.id"
      :data-status="match.status"
    >
      <Component
        class="recent-matches__item-icon"
        tabindex="0"
        :is="getIcon(match.status)"
      />
      <template #popper>
        <div class="recent-matches__item-menu">
          <span class="recent-matches__item-fixture">
            Rodada {{ match.gameweek }} -
            {{ WEEKDAYS[match.weekDay].substring(0, 3) }} {{ match.time }}
          </span>
          <div class="recent-matches__item-match">
            <BaseMatchTeam
              alignment="right"
              :team="match.homeTeam"
            />
            <span class="recent-matches__item-score">
              {{ match.homeTeamScore }} - {{ match.awayTeamScore }}
            </span>
            <BaseMatchTeam :team="match.awayTeam" />
          </div>
        </div>
      </template>
    </Dropdown>
  </div>
</template>

<script lang="ts">
enum RecentGameStatus {
  WON = 'won',
  DRAWN = 'drawn',
  LOST = 'lost',
  NOT_PLAYED = 'not-played',
}

interface RecentGame extends Match {
  status: RecentGameStatus;
}
</script>

<script lang="ts" setup>
import type { Match, MatchTeam } from '@/types/Match';
import { computed } from 'vue';
import { Dropdown } from 'floating-vue';
import { WEEKDAYS } from '@/constants/weekDays';
import IconCheckCircle from '@/assets/icons/CheckCircle.svg';
import IconCircleMinus from '@/assets/icons/CircleMinus.svg';
import IconErrorCicle from '@/assets/icons/ErrorCircle.svg';
import IconEmptyCircle from '@/assets/icons/EmptyCircle.svg';
import BaseMatchTeam from './BaseMatchTeam.vue';

const props = defineProps<{
  recentGames: Match[];
  team: MatchTeam;
}>();

function getStatus(game: Match): RecentGameStatus {
  if (game.homeTeamScore === null || game.awayTeamScore === null) {
    return RecentGameStatus.NOT_PLAYED;
  }

  if (game.homeTeamScore === game.awayTeamScore) {
    return RecentGameStatus.DRAWN;
  }

  const homeTeamWon = game.homeTeamScore > game.awayTeamScore;
  const isHomeTeam = game.homeTeam?.id === props.team.id;

  if ((homeTeamWon && isHomeTeam) || (!homeTeamWon && !isHomeTeam)) {
    return RecentGameStatus.WON;
  }

  return RecentGameStatus.LOST;
}

const displayedGames = computed<RecentGame[]>(() => (
  props.recentGames.map((game) => ({
    ...game,
    status: getStatus(game),
  }))
));

function getIcon(status: RecentGameStatus) {
  switch (status) {
    case RecentGameStatus.WON:
      return IconCheckCircle;
    case RecentGameStatus.DRAWN:
      return IconCircleMinus;
    case RecentGameStatus.NOT_PLAYED:
      return IconEmptyCircle;
    case RecentGameStatus.LOST:
    default:
      return IconErrorCicle;
  }
}
</script>

<style lang="scss" scoped>
.recent-matches {
  display: flex;
  gap: 0.375rem;
  cursor: default;
  &__item {
    display: flex;
    color: var(--color);
    &[data-status="won"] {
      --color: #{$color--success-600};
    }
    &[data-status="drawn"],
    &[data-status="not-played"] {
      --color: #{$color--text-300};
    }
    &[data-status="lost"] {
      --color: #{$color--danger};
    }
    &:last-child:not([data-status="not-played"]) > .recent-matches__item-icon:not(:focus) {
      outline-color: var(--color);
    }
  }
  &__item-icon {
    border-radius: $radius--full;
    outline: 2px solid transparent;
    outline-offset: 1px;
    &:focus {
      outline-color: $color--black;
    }
  }
  &__item-menu {
    font-size: 0.875rem;
    font-weight: $font-weight--medium;
  }
  &__item-fixture {
    display: flex;
    justify-content: center;
    margin-bottom: 0.25rem;
    font-size: 0.75rem;
  }
  &__item-match {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 0.5rem;
  }
  &__item-score {
    display: flex;
    height: fit-content;
    padding: 0.25rem 0.375rem;
    align-items: center;
    background-color: $color--blue-1000;
    border-radius: 0.25rem;
    color: $color--white;
    font-size: 0.75rem;
    font-weight: $font-weight--semibold;
  }
}
</style>
