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
        class="shrink-0 size-1"
        :is="iconLeft"
      />
    </slot>
    <slot>{{ label }}</slot>
    <slot name="right">
      <component
        v-if="iconRight"
        class="shrink-0 size-1"
        :is="iconRight"
      />
    </slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isActive?: boolean;
  label?: string;
  iconLeft?: unknown;
  iconRight?: unknown;
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
