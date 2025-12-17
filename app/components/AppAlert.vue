<template>
  <div
    class="alert"
    role="alert"
    :class="{
      'alert-info': type === 'info',
      'alert-success': type === 'success',
      'alert-warning': type === 'warning',
      'alert-error': type === 'error',
      'alert-soft': soft,
    }"
  >
    <slot name="icon">
      <component
        class="shrink-0"
        :is="icon"
      />
    </slot>
    <slot>
      <span>{{ message }}</span>
    </slot>
  </div>
</template>

<script setup lang="ts">
import type { Icon } from '@tabler/icons-vue';

defineProps<{
  icon?: Icon;
  message?: string;
  soft?: boolean;
  type?: 'success' | 'error' | 'warning' | 'info';
}>()
</script>
