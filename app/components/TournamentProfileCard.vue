<template>
  <div class="card card-border card-side">
    <div class="flex justify-center items-center size-5.5 m-1 mr-0">
      <img
        class="w-auto h-full"
        alt="Tournament icon"
        :src="tournament.icon"
      />
    </div>
    <div class="card-body">
      <h1 class="text-3xl font-medium">{{ tournament.name }}</h1>
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
