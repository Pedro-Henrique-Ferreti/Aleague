<template>
  <li>
    <BaseButton
      class="disabled:cursor-[unset] disabled:hover:no-underline"
      :disabled="disabled"
      :to="to"
    >
      <component
        v-if="icon"
        :is="icon"
        class="h-1 w-1"
      />
      <slot>{{ label }}</slot>
    </BaseButton>
  </li>
</template>

<script lang="ts" setup>
import type { Icon } from '@tabler/icons-vue';
import type { BaseButtonProps } from './BaseButton.vue';

defineProps<Pick<BaseButtonProps, 'to' | 'disabled'> & {
  label?: string;
  icon?: Icon;
}>();
</script>
