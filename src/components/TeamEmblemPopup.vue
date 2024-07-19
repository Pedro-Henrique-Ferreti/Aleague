<template>
  <Dropdown
    theme="app-popup-large"
    auto-hide
    :triggers="['click']"
  >
    <slot />
    <template #popper="{ hide }">
      <div class="team-emblem__list">
        <button
          v-for="emblem in teamEmblems"
          class="team-emblem__item"
          type="button"
          :key="emblem.id"
          :data-selected="selectedEmblem.id === emblem.id"
          @click="$emit('update:selectedEmblem', emblem), hide()"
        >
          <img
            class="team-emblem__item-image"
            alt=""
            :src="emblem.url"
          />
        </button>
      </div>
    </template>
  </Dropdown>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { TeamEmblem } from '@/types/Team';
import { Dropdown } from 'floating-vue';

defineEmits(['update:selectedEmblem']);
defineProps({
  teamEmblems: {
    type: Array as PropType<TeamEmblem[]>,
    required: true,
  },
  selectedEmblem: {
    type: Object as PropType<TeamEmblem>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.team-emblem {
  &__list {
    display: grid;
    place-items: center;
    grid-template-columns: repeat(auto-fill, minmax(2.25rem, 1fr));
    gap: 0.5rem;
  }
  &__item {
    display: grid;
    place-items: center;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: $radius--small;
    transition: background-color $transition--fastest;
    &:hover:not([data-selected="true"]) {
      background-color: $color--neutral-200;
    }
    &[data-selected="true"] {
      background-color: $color--blue-1100;
    }
  }
  &__item-image {
    max-width: 88%;
    max-height: 88%;
  }
}
</style>
