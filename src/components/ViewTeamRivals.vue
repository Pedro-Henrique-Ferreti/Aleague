<template>
  <AppCard title="Rivais">
    <div class="rivals">
      <button
        v-for="item in team.rivals"
        v-tooltip="item.name"
        class="rivals__rival-team"
        type="button"
        :key="item.id"
      >
        <img
          class="rivals__rival-team-emblem"
          :src="item.emblem.url"
          :alt="`${item.name}'s emblem'`"
        />
      </button>
      <button
        v-tooltip="'Adicionar rival'"
        class="rivals__button-add"
        type="button"
      >
        <IconPlus />
      </button>
    </div>
  </AppCard>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { TeamDetails } from '@/types/Team';
import IconPlus from '@/assets/icons/IconPlus.svg';
import AppCard from './AppCard.vue';

defineProps({
  team: {
    type: Object as PropType<TeamDetails>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.rivals {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  &__rival-team {
    display: grid;
    place-items: center;
    width: 5rem;
    height: 5rem;
    border: 1px solid $color--neutral-100;
    border-radius: $radius--medium;
  }
  &__rival-team-emblem {
    max-width: 4rem;
    max-height: 4rem;
  }
  &__button-add {
    display: grid;
    place-items: center;
    width: 5rem;
    height: 5rem;
    color: $color--primary;
    background-color: $color--neutral-100;
    border-radius: $radius--medium;
    transition: color $transition--fastest;
    &:hover {
      color: $color--primary-800;
    }
  }
}
</style>
