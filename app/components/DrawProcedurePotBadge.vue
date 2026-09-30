<template>
  <BreadcrumbItem>
    <div
      class="badge badge-md transition-colors min-w-5.75"
      :class="{
        'badge-secondary badge-outline': type === 'active',
        'badge-success badge-soft': type === 'completed',
      }"
    >
      <IconCircleCheck
        v-if="type === 'completed'"
        class="size-[1em] animate-fade"
      />
      {{ getDrawPotName(index) }}
    </div>
  </BreadcrumbItem>
</template>

<script setup lang="ts">
import { IconCircleCheck } from '@tabler/icons-vue';
import { getDrawPotName } from '~/helpers/draw';

defineProps<{
  type?: 'active' | 'completed';
  index: number;
}>();
</script>
