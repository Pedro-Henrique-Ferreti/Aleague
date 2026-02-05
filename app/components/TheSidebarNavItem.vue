<template>
  <li>
    <BaseButton
      :class="{ 'bg-base-200 text-black': isActive }"
      :to="to"
    >
      <component :is="icon" class="h-1 w-1" />
      <span>{{ label }}</span>
    </BaseButton>
  </li>
</template>

<script lang="ts" setup>
import type { Icon } from '@tabler/icons-vue';
import type { RouteLocationRaw } from 'vue-router';

defineProps<{
  label: string;
  icon: Icon;
  to: RouteLocationRaw;
  isActive?: boolean;
}>();
</script>
