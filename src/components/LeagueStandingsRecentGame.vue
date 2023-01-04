<template>
  <AppTooltip>
    <template #tooltip-content>
      <MatchAbridged
        :league-name="`${league?.name} - Rodada ${game.gameweek}`"
        :match-hour="game.hour"
        :home-team="game.homeTeam.name"
        :home-team-score="game.homeTeamScore"
        :away-team="game.awayTeam.name"
        :away-team-score="game.awayTeamScore"
      />
    </template>
    <div
      class="recent-game"
      :title="icon.title"
    >
      <BaseIcon
        class="recent-game__icon"
        :class="[status]"
        :icon="icon.name"
      />
    </div>
  </AppTooltip>
</template>

<script lang="ts" setup>
import type { LeagueGame } from '@/types/League';
import { computed, inject, type PropType } from 'vue';
import { KEY_LEAGUE } from '@/constants/injectionKeys';
import AppTooltip from './AppTooltip.vue';
import MatchAbridged from './MatchAbridged.vue';

const props = defineProps({
  game: {
    type: Object as PropType<LeagueGame>,
    required: true,
  },
  teamId: {
    type: Number,
    required: true,
  },
});

// Injected values
const league = inject(KEY_LEAGUE);

const status = computed<'win' | 'draw' | 'lose'>(() => {
  const { homeTeamScore, awayTeamScore, homeTeam, awayTeam } = props.game;

  if (homeTeamScore === awayTeamScore) return 'draw';

  if (
    (homeTeamScore > awayTeamScore && homeTeam.id === props.teamId)
    || (awayTeamScore > homeTeamScore && awayTeam.id === props.teamId)
  ) return 'win';

  return 'lose';
});

const icon = computed(() => {
  switch (status.value) {
    case 'win':
      return {
        name: 'check-circle',
        title: 'Vitória',
      };
    case 'draw':
      return {
        name: 'minus-circle',
        title: 'Empate',
      };
    case 'lose':
    default:
      return {
        name: 'circle-x',
        title: 'Derrota',
      };
  }
});
</script>

<style lang="scss" scoped>
.recent-game {
  display: inline-flex;
  align-items: center;
  height: 100%;
  &__icon {
    width: 1rem;
    height: 1rem;
    &.win {
      fill: $color--success-500;
    }
    &.draw {
      fill: $color--text-lighten;
    }
    &.lose {
      fill: $color--danger;
    }
  }
}
</style>
