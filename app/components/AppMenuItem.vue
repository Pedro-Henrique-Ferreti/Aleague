<template>
  <li>
    <button
      type="button"
      class="whitespace-nowrap"
      :class="{
        'text-error hover:bg-error/8 active:bg-error! active:text-error-content!': type === 'error',
        'text-primary hover:bg-primary/8 active:bg-primary! active:text-primary-content!': type === 'primary',
      }"
      @click="$emit('click')"
    >
      <component
        :is="icon"
        class="size-1"
      />
      <span>{{ label }}</span>
    </button>
  </li>
</template>

<script lang="ts" setup>
import type { Icon } from '@tabler/icons-vue';

defineProps<{
  label: string;
  icon: Icon;
  type?: 'primary' | 'error';
}>();
defineEmits<{ click: [] }>();
</script>
