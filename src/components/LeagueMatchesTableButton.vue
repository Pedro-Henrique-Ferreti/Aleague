<template>
  <button
    class="league-matches-button"
    type="button"
    :aria-label="ariaLabel"
  >
    <BaseIcon
      class="league-matches-button__icon"
      :icon="icon"
      :data-rotate="rotate || null"
    />
  </button>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

defineProps({
  icon: {
    type: String,
    default: 'chevron',
  },
  ariaLabel: {
    type: String,
    required: true,
    default: '',
  },
  rotate: {
    type: String as PropType<'left' | 'right'>,
    default: '',
  },
});
</script>

<style lang="scss" scoped>
.league-matches-button {
  @include focus-ring;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  background-color: $color--white;
  border: 1px solid $color--light-gray-1;
  border-radius: 0.25rem;
  transition: background-color $transition--fastest ease-in;
  &:hover {
    background-color: $color--light-gray-2;
  }
  &__icon {
    height: 0.85rem;
    fill: $color--primary;
    &[data-rotate="left"] {
      transform: rotate(180deg);
    }
    &[data-rotate="right"] {
      transform: rotate(-180deg);
    }
  }
}
</style>
