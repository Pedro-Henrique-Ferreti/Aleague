<template>
  <div
    class="alert text-xs font-semibold"
    role="alert"
    :class="{
      'alert-info': type === 'info',
      'alert-success': type === 'success',
      'alert-warning': type === 'warning',
      'alert-error': type === 'error',
      'alert-soft': soft,
    }"
  >
    <div class="shrink-0">
      <slot name="icon">
        <component
          :is="icon"
          class="text-primary"
        />
      </slot>
    </div>
    <slot>
      <p>{{ message }}</p>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { type Icon, IconInfoCircle } from '@tabler/icons-vue';

interface Props {
  icon?: Icon;
  message?: string;
  soft?: boolean;
  type?: 'success' | 'error' | 'warning' | 'info';
}

withDefaults(defineProps<Props>(), {
  icon: () => IconInfoCircle,
});
</script>
