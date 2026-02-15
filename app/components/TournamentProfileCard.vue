<template>
  <div class="flex items-center gap-1.5">
    <img
      class="w-auto h-6"
      alt="Tournament icon"
      :src="tournament.icon"
    >
    <div>
      <h1 class="text-3xl font-medium mb-0.5">{{ tournament.name }}</h1>
      <div class="badge-container flex-wrap">
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
  </div>
</template>

<script setup lang="ts">
import { IconCalendarPlus, IconPencil } from '@tabler/icons-vue';

defineProps<{
  tournament: Tournament;
}>();
</script>
