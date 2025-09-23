<template>
  <div class="card card-border card-side mb-2 tablet-lg:w-2/3 desktop:w-1/2">
    <div class="flex justify-center items-center w-5.5 h-5.5 m-1 mr-0">
      <img
        class="w-auto h-full"
        alt="Tournament icon"
        :src="getTournamentIcon(tournament.iconId)"
      />
    </div>
    <div class="card-body">
      <h1 class="text-3xl font-medium mb-0.75">{{ tournament.name }}</h1>
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
import { getTournamentIcon } from '~/helpers/tournament';

defineProps<{
  tournament: Tournament;
}>();
</script>
