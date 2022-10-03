<template>
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
</template>

<script lang="ts" setup>
import type { Game } from '@/types/Game';
import { computed, type PropType } from 'vue';

const props = defineProps({
  game: {
    type: Object as PropType<Game>,
    required: true,
  },
  teamId: {
    type: Number,
    required: true,
  },
});

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
  &:not(:last-child) {
    margin-right: 0.25rem;
  }
  &__icon {
    width: 1rem;
    height: 1rem;
    &.win {
      fill: $color--success-darken-2;
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
