<template>
  <Dropdown
    class="tournament-icon__wrapper"
    theme="app-popup-large"
    auto-hide
    :triggers="['click']"
    @apply-show="setScrollPosition"
  >
    <button
      class="tournament-icon__button"
      type="button"
      aria-label="Toggle icon modal"
    >
      <img
        class="tournament-icon__button-image"
        alt="Selected icon"
        :src="`/images/competition-icons/icon-${modelValue}.svg`"
      />
    </button>
    <template #popper="{ hide }">
      <div
        class="tournament-icon__list"
        ref="iconList"
      >
        <button
          v-for="id in NUMBER_OF_TOURNAMENT_ICONS"
          class="tournament-icon__item"
          type="button"
          :key="id"
          :data-selected="modelValue === id"
          @click="$emit('update:modelValue', id), hide()"
        >
          <IconSuccess
            v-if="modelValue === id"
            class="tournament-icon__item-check-icon"
          />
          <img
            class="tournament-icon__item-image"
            alt=""
            :src="`/images/competition-icons/icon-${id}.svg`"
          />
        </button>
      </div>
    </template>
  </Dropdown>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Dropdown } from 'floating-vue';
import { NUMBER_OF_TOURNAMENT_ICONS } from '@/constants/tournament';
import IconSuccess from '@/assets/icons/Success.svg';

defineEmits(['update:modelValue']);
defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
});

// Template refs
const iconList = ref<HTMLDivElement | null>();

function setScrollPosition() {
  iconList.value?.querySelector('[data-selected="true"]')?.scrollIntoView({
    block: 'nearest',
    behavior: 'instant',
  });
}
</script>

<style lang="scss" scoped>
.tournament-icon {
  &__wrapper {
    height: fit-content;
  }
  &__button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 6rem;
    aspect-ratio: 1 / 1;
    border: 1px solid $color--neutral-100;
    border-radius: $radius--large;
  }
  &__button-image {
    max-width: 83%;
    max-height: 83%;
  }
  &__list {
    display: grid;
    place-items: center;
    grid-template-columns: repeat(auto-fill, minmax(4rem, 1fr));
    gap: 0.5rem;
  }
  &__item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 4rem;
    height: 4rem;
    border-radius: $radius--medium;
    transition: background-color $transition--fastest;
    position: relative;
    &[data-selected="true"] {
      background-color: $color--neutral-100;
    }
  }
  &__item-image {
    max-width: 88%;
    max-height: 88%;
  }
  &__item-check-icon {
    width: 1.25rem;
    height: 1.25rem;
    border-radius: $radius--full;
    color: $color--success-600;
    box-shadow: 0 0 0 2px $color--white;
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
</style>
