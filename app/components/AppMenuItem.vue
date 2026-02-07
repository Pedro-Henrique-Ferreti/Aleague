<template>
 <li>
    <button
      type="button"
      :class="{ 'text-error hover:bg-error/8 active:bg-error! active:text-error-content!': type === 'error' }"
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

defineProps<{
  label: string;
  icon: Icon;
  type?: 'error';
}>();
</script>

