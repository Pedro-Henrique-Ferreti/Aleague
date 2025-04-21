<template>
  <div class="recent-matches">
    <Dropdown
      v-for="match in displayedMatches"
      class="recent-matches__item"
      theme="match-tooltip"
      :auto-hide="false"
      :key="match.id"
      :data-outcome="match.outcome"
    >
      <Component
        class="recent-matches__item-icon"
        tabindex="0"
        :is="getIcon(match.outcome)"
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
interface RecentMatch extends Match {
  outcome: MatchOutcome;
}
</script>

<script lang="ts" setup>
import { type Match, MatchOutcome, type MatchTeam } from '@/types/Match';
import { computed } from 'vue';
import { Dropdown } from 'floating-vue';
import { WEEKDAYS } from '@/constants/weekDays';
import { getMatchOutcome } from '@/helpers/match';
import IconCheckCircle from '@/assets/icons/CheckCircle.svg';
import IconCircleMinus from '@/assets/icons/CircleMinus.svg';
import IconErrorCicle from '@/assets/icons/ErrorCircle.svg';
import IconEmptyCircle from '@/assets/icons/EmptyCircle.svg';
import BaseMatchTeam from './BaseMatchTeam.vue';

const props = defineProps<{
  recentGames: Match[];
  team: MatchTeam;
}>();

const displayedMatches = computed<RecentMatch[]>(() => (
  props.recentGames.map((game) => ({
    ...game,
    outcome: getMatchOutcome(props.team.id, game),
  }))
));

function getIcon(outcome: MatchOutcome) {
  switch (outcome) {
    case MatchOutcome.WIN:
      return IconCheckCircle;
    case MatchOutcome.DRAW:
      return IconCircleMinus;
    case MatchOutcome.LOSS:
      return IconErrorCicle;
    case MatchOutcome.NOT_PLAYED:
    default:
      return IconEmptyCircle;
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
    &[data-outcome="win"] {
      --color: #{$color--success-600};
    }
    &[data-outcome="draw"],
    &[data-outcome="not-played"] {
      --color: #{$color--text-300};
    }
    &[data-outcome="loss"] {
      --color: #{$color--danger};
    }
    &:last-child:not([data-outcome="not-played"]) > .recent-matches__item-icon:not(:focus) {
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
