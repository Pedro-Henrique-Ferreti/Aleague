<template>
  <AppButton
    :class="[type === 'delete' ? 'toolbar-delete-button' : 'toolbar-button']"
    :label="label"
    :icon-left="iconLeft"
  />
</template>

<script setup lang="ts">
import type { AppButtonProps } from './AppButton.vue';

defineProps<Pick<AppButtonProps, 'label' | 'iconLeft'> & {
  type?: 'delete';
}>();
</script>

<style scoped>
@reference '@/assets/css/main.css';

.toolbar-button {
  @apply px-0.5 bg-transparent border-0 hover:bg-base-200;
}

.toolbar-delete-button {
  @apply text-error px-0.5 bg-transparent border-0 hover:bg-error/8;
}
</style>
