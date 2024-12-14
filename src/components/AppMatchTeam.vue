<template>
  <div
    class="match-team"
    :data-tbd="!team"
  >
    <template v-if="team">
      <img
        class="match-team__emblem"
        :src="team.emblem.url"
        :alt="`${team.name}'s emblem`"
      />
      <span>{{ team.name }}</span>
    </template>
    <template v-else>
      <IconTeamBadge class="match-team__emblem" />
      <span>A definir</span>
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { MatchTeam } from '@/types/Match';
import type { PropType } from 'vue';
import IconTeamBadge from '@/assets/icons/TeamBadge.svg';

defineProps({
  team: {
    type: Object as PropType<MatchTeam | null>,
    default: null,
  },
});
</script>

<style lang="scss" scoped>
.match-team {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  &[data-tbd="false"] {
    color: $color--text-strong;
  }
  &__emblem {
    max-width: 1.5rem;
    max-height: 1.5rem;
    color: $color--text-300;
  }
}
</style>
