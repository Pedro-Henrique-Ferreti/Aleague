<template>
  <li>
    <component
      v-bind="clickable && { type: 'button' }"
      :is="clickable ? 'button' : 'div'"
      :class="!clickable && 'cursor-[unset] hover:no-underline'"
      @click="clickable && $emit('click')"
    >
      <component
        v-if="icon"
        :is="icon"
        class="h-1 w-1"
      />
      <slot>{{ label }}</slot>
    </component>
  </li>
</template>

<script lang="ts" setup>
import type { Icon } from '@tabler/icons-vue';

defineProps<{
  label?: string;
  icon?: Icon;
  clickable?: boolean;
}>();

defineEmits<{ click: [] }>();
</script>
