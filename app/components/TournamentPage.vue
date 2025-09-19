<template>
  <div class="flex justify-between mb-2">
    <div>
      <h1 class="text-3xl font-medium mb-0.75">{{ tournament.name }}</h1>
      <div class="badge-container">
        <div class="badge badge-ghost">
          <IconCalendarPlus class="size-[1em]" />
          {{ formatDate(tournament.createdAt, 'd MMM yyyy') }}
        </div>
        <div class="badge badge-ghost">
          <IconPencil class="size-[1em]" />
          {{ formatDate(tournament.updatedAt, 'd MMM yyyy') }}
        </div>
      </div>
    </div>
    <AppButton
      class="btn-primary"
      label="Exportar"
      :icon-left="IconFileArrowRight"
    />
  </div>
</template>

<script setup lang="ts">
import { IconCalendarPlus, IconFileArrowRight, IconPencil } from '@tabler/icons-vue';

defineProps<{
  tournament: Tournament;
}>();
</script>
