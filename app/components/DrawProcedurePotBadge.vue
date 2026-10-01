<template>
  <BreadcrumbItem>
    <div
      class="badge badge-md transition-colors min-w-5.75"
      :class="{
        'badge-secondary badge-outline': status === DrawPotStatus.ACTIVE,
        'badge-success badge-soft': status === DrawPotStatus.COMPLETED,
      }"
    >
      <IconCircleCheck
        v-if="status === DrawPotStatus.COMPLETED"
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
  index: number;
  status?: DrawPotStatus;
}>();
</script>
