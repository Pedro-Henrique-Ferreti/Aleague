<template>
  <header class="grid gap-1 mb-2 tablet-lg:grid-cols-[2fr_1fr] desktop:grid-cols-2">
    <TournamentProfileCard :tournament="tournament" />
    <div class="flex justify-end">
      <TournamentStageModal :tournament="tournament" />
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  tournament: Tournament;
}>();
</script>
