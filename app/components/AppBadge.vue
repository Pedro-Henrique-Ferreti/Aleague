<template>
  <div class="badge">
    <component
      v-if="icon"
      :is="icon"
      class="size-[1em]"
    />
    <slot>{{ text }}</slot>
  </div>
</template>

<script lang="ts" setup>
import type { Icon } from '@tabler/icons-vue';

defineProps<{
  icon?: Icon;
  text?: string;
}>();
</script>
