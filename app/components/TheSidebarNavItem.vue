<template>
  <li>
    <BaseButton :to="to">
      <component
        :is="icon"
        class="h-1 w-1"
      />
      <span>{{ label }}</span>
    </BaseButton>
  </li>
</template>

<script lang="ts" setup>
import type { Icon } from '@tabler/icons-vue';
import type { BaseButtonProps } from './BaseButton.vue';

defineProps<{
  label: string;
  icon: Icon;
  to: BaseButtonProps['to'];
}>();
</script>
