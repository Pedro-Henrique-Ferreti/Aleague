<template>
  <NuxtLayout name="default">
    <template #header>
      <template
        v-if="tournamentStore.activeTournamentId"
        class="flex gap-[inherit] mr-auto"
      >
        <CloseTournamentButton />
        <EditTournamentButton />
        <ExportTournamentButton />
      </template>
      <template v-if="tournamentStore.tournaments.length > 0">
        <ImportTournamentButton />
        <CreateTournamentButton />
      </template>
    </template>
    <TournamentList />
  </NuxtLayout>
</template>

<script setup lang="ts">
const tournamentStore = useTournamentStore();

definePageMeta({
  layout: false,
});
</script>
