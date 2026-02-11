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
        class="size-1"
        :is="icon"
      />
      <span>{{ label }}</span>
    </button>
  </li>
</template>

<script lang="ts" setup>
import type { Icon } from '@tabler/icons-vue';

defineEmits<{
  click: [];
}>();
defineProps<{
  label: string;
  icon: Icon;
  type?: 'primary' | 'error';
}>();
</script>
