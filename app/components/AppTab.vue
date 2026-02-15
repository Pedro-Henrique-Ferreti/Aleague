<template>
  <div
    role="tab"
    tabindex="0"
    class="tab"
    :class="{ 'tab-active': isActive }"
  >
    <slot name="left">
      <component
        v-if="iconLeft"
        :is="iconLeft"
        class="shrink-0 size-1"
      />
    </slot>
    <slot>{{ label }}</slot>
    <slot name="right">
      <component
        v-if="iconRight"
        :is="iconRight"
        class="shrink-0 size-1"
      />
    </slot>
  </div>
</template>

<script setup lang="ts">
import type { Icon } from '@tabler/icons-vue';

defineProps<{
  isActive?: boolean;
  label?: string;
  iconLeft?: Icon;
  iconRight?: Icon;
}>();
</script>

<style scoped>
@reference '@/assets/css/main.css';
.tab {
  @apply flex items-center gap-0.5 min-w-4.5 text-nowrap overflow-hidden relative;
  &::after {
    @apply absolute right-[calc(var(--tab-p)-1px)] hidden h-full w-0.5 bg-linear-to-r from-transparent to-white;
  }
}
</style>
