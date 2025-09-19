<template>
  <button
    role="tab"
    type="button"
    class="tab min-w-4.5 text-nowrap overflow-hidden relative after:absolute after:right-[calc(var(--tab-p)-1px)] after:block after:h-full after:w-0.5 after:bg-linear-to-r after:from-transparent after:to-white"
    :class="{ 'tab-active': isActive }"
  >
    <span class="flex gap-0.5 items-center overflow-hidden">
      <component
        v-if="icon"
        class="shrink-0 size-1"
        :is="icon"
      />
      <slot>{{ label }}</slot>
    </span>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  isActive?: boolean;
  label?: string;
  icon?: unknown;
}>();
</script>
