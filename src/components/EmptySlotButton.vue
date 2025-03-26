<template>
  <BaseButton
    class="empty-slot-button"
    :data-size="size"
    :data-active="isActive"
    :data-theme="theme"
  >
    <IconPlus />
    <span>Adicionar</span>
  </BaseButton>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import IconPlus from '@/assets/icons/Plus.svg';
import BaseButton from './BaseButton.vue';

defineProps({
  size: {
    type: String as PropType<'small'>,
    default: null,
  },
  theme: {
    type: String as PropType<'light'>,
    default: null,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.empty-slot-button {
  &[data-size="small"] {
    height: 2rem;
  }
  &[data-theme="light"] {
    background-color: $color--white;
  }
  &[data-active="true"] {
    background-color: $color--blue-100;
    border-color: $color--blue-800;
    color: $color--blue;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  height: 2.375rem;
  background-color: $color--neutral-100;
  border: 1px dashed $color--neutral-300;
  border-radius: $radius--medium;
  font-size: 0.875rem;
  transition: border-color $transition--fastest;
  &:hover:not([data-active="true"]) {
    border-color: $color--text-400;
  }
  svg {
    width: 0.625rem;
    height: 0.625rem;
  }
}
</style>
