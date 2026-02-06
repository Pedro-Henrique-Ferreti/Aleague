<template>
  <li>
    <div class="cursor-[unset] hover:no-underline">
      <component
        v-if="icon"
        :is="icon"
        class="h-1 w-1"
      />
      <slot>{{ label }}</slot>
    </div>
  </li>
</template>

<script lang="ts" setup>
import type { Icon } from '@tabler/icons-vue';

defineProps<{
  label?: string;
  icon?: Icon;
}>();
</script>
