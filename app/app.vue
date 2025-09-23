<template>
  <div class="container-lg pt-2 pb-3">
    <header class="flex w-full justify-end gap-1 mb-2">
      <div
        v-if="tournamentStore.activeTournamentId"
        class="flex gap-[inherit] mr-auto"  
      >
        <CloseTournamentButton />
        <EditTournamentButton />
        <ExportTournamentButton />
      </div>
      <template v-if="tournamentStore.tournaments.length > 0">
        <ImportTournamentButton />
        <CreateTournamentButton />
      </template>
    </header>
    <TournamentList />
  </div>
</template>

<script setup lang="ts">
const tournamentStore = useTournamentStore();
</script>
