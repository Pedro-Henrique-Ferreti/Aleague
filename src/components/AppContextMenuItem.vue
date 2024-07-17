<template>
  <BaseButton
    class="context-menu-item"
    :to="to"
    :data-color="color"
  >
    <Component
      class="context-menu-item__icon"
      :is="icon"
    />
    <span>{{ text }}</span>
  </BaseButton>
</template>

<script lang="ts">
const Colors = {
  DANGER: 'danger',
} as const;
</script>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { RouteLocationRaw } from 'vue-router';
import type { ValueOf } from '@/types/Auth';
import BaseButton from './BaseButton.vue';

defineProps({
  to: {
    type: [String, Object] as PropType<RouteLocationRaw>,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
  icon: {
    type: null,
    default: null,
  },
  color: {
    type: String as PropType<ValueOf<typeof Colors>>,
    default: '',
  },
});
</script>

<style lang="scss" scoped>
.context-menu-item {
  &[data-color="danger"] {
   --hover--bg-color: #{$color--danger-100};
    color: $color--danger;
  }
  display: flex;
  align-items: center;
  gap: 0.5rem;
  height: 2.25rem;
  padding: 0 0.875rem;
  font-size: 0.875rem;
  font-weight: $font-weight--medium;
  transition: background-color $transition--fastest;
  &:hover {
    background-color: var(--hover--bg-color, #{$color--neutral-100});
  }
  &__icon {
    max-width: 0.875rem;
    max-height: 0.875rem;
  }
}
</style>
