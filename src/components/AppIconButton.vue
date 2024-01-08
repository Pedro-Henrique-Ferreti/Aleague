<template>
  <button
    class="icon-button"
    :data-theme="theme"
    :data-active="isActive"
    @click="$emit('click')"
  >
    <BaseIcon
      class="icon-button__icon"
      :icon="icon"
    />
  </button>
</template>

<script lang="ts">
type IconButtonTheme = 'danger' | 'hover-danger';
</script>

<script lang="ts" setup>
import type { PropType } from 'vue';
import BaseIcon from './common/BaseIcon.vue';

defineEmits(['click']);

defineProps({
  icon: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  theme: {
    type: String as PropType<IconButtonTheme>,
    default: '',
  },
});
</script>

<style lang="scss" scoped>
.icon-button {
  --bg-color: #{$color--light-gray-2};
  --icon-size: 1.25rem;
  --icon-color: #{$color--text-lighten};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  background-color: $color--white;
  border-radius: 0.375rem;
  transition: background-color $transition--fastest ease-in-out;
  @include focus-ring;
  &[data-theme="hover-danger"]:hover {
    --bg-color: #{$color--danger-100};
    --icon-color: #{$color--danger};
  }
  &:hover,
  &[data-active="true"] {
    background-color: var(--bg-color);
  }
  &__icon {
    width: var(--icon-size);
    height: var(--icon-size);
    fill: var(--icon-color);
    transition: fill $transition--fastest ease-in-out;
  }
}
</style>
