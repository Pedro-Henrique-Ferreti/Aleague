<template>
  <Dropdown
    class="team-emblem"
    theme="app-popup-large"
    auto-hide
    :triggers="['click']"
  >
    <button
      class="team-emblem__button"
      type="button"
    >
      <img
        class="team-emblem__image"
        alt=""
        :src="selectedEmblem.url"
      />
    </button>
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
            class="team-emblem__image"
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
  display: grid;
  place-items: center;
  place-self: center;
  width: 2.5rem;
  height: 2.5rem;
  &__button {
    display: grid;
    place-items: center;
    width: inherit;
    height: inherit;
  }
  &__image {
    max-width: 88%;
    max-height: 88%;
  }
  &__loader {
    margin: auto 0;
  }
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
}
</style>
