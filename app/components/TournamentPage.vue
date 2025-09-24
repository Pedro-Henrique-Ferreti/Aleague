<template>
  <TournamentPageHeader :tournament="tournament" />
</template>

<script setup lang="ts">
defineProps<{
  tournament: Tournament;
}>();
</script>
