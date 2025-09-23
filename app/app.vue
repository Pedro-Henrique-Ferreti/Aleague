<template>
  <div class="container-lg pt-2 pb-3">
    <header class="flex w-full justify-end gap-1 mb-2">
      <template v-if="tournamentStore.activeTournamentId">
        <CloseTournamentButton class="mr-auto" />
        <ExportTournamentButton />
      </template>
      <ImportTournamentButton />
      <CreateTournamentButton />
    </header>
    <TournamentList />
  </div>
</template>

<script setup lang="ts">
const tournamentStore = useTournamentStore();
</script>
