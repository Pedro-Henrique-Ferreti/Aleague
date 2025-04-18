<template>
  <div
    class="team"
    :style="`--position-color: ${row.positionColor || 'transparent'};`"
  >
    <button
      v-tooltip="'Trocar legenda'"
      class="team__position"
      type="button"
      @click.stop="$emit('update-position-color')"
    >
      {{ row.position }}
    </button>
    <div class="team__movement" />
    <template v-if="row.team.id">
      <img
        class="team__emblem"
        :src="row.team.emblemUrl"
        :alt="`${row.team.name}'s emblem`"
      />
      <span>{{ row.team.name }}</span>
    </template>
    <template v-else>
      <IconTeamBadge class="team__emblem team__emblem--default" />
      <div class="team__empty-slot">
        <IconPlus />
        <span>Adicionar</span>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { TournamentStageStandings } from '@/types/Tournament';
import IconTeamBadge from '@/assets/icons/TeamBadge.svg';
import IconPlus from '@/assets/icons/Plus.svg';

defineEmits(['update-position-color']);
defineProps<{
  row: TournamentStageStandings;
  teamDataWidth: string;
}>();
</script>

<style lang="scss" scoped>
.team {
  display: flex;
  align-items: center;
  height: inherit;
  background-color: var(--row-bg-color);
  border-bottom: 1px solid $color--neutral-300;
  border-left: 3px solid;
  border-left-color: var(--position-color, transparent);
  text-align: left;
  transition: background-color $transition--fastest ease-in;
  &__position {
    width: 2.25rem;
    height: 100%;
    padding-left: 0.625rem;
    border-radius: 0 $radius--small $radius--small 0;
    text-align: left;
    transition: background-color $transition--fast ease-in;
    &:hover {
      background-color: $color--neutral-100;
    }
  }
  &__movement {
    width: 0.25rem;
    height: 0.25rem;
    margin-right: 1rem;
    background-color: $color--text-300;
    border-radius: $radius--full;
  }
  &__emblem {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.75rem;
    flex-shrink: 0;
    &--default {
      color: $color--text-300;
    }
  }
  &__empty-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    max-width: 15rem;
    font-size: 0.875rem;
    svg {
      width: 0.625rem;
      height: 0.625rem;
    }
  }
}
</style>
